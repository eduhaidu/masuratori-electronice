import logging
import os
from contextlib import contextmanager

from dotenv import load_dotenv
from pymodbus.client import ModbusSerialClient

load_dotenv()

REGISTERS = {
    "current_l1": (0x1802, 2, 10.0),
    "current_l2": (0x1804, 2, 10.0),
    "current_l3": (0x1806, 2, 10.0),
    "voltage_l1_n": (0x1816, 2, 10.0),
    "voltage_l2_n": (0x1818, 2, 10.0),
    "voltage_l3_n": (0x181A, 2, 10.0),
    "active_power": (0x182A, 2, 1.0),
    "energy_import": (0x1848, 4, 1000.0),  # actual kWh register from manual (update if different)
}

def _build_client() -> ModbusSerialClient:
    return ModbusSerialClient(
        port=os.getenv("MODBUS_PORT", "COM8"),
        baudrate=int(os.getenv("MODBUS_BAUDRATE", 19200)),
        parity=os.getenv("MODBUS_PARITY", "E"),
        stopbits=int(os.getenv("MODBUS_STOPBITS", 1)),
        timeout=float(os.getenv("MODBUS_TIMEOUT", 3)),
    )

@contextmanager
def modbus_session():
    client = _build_client()
    try:
        if not client.connect():
            raise ConnectionError(f"Cannot open Modbus port {client.comm_params.port}.")
        yield client
    finally:
        if client.connected:
            client.close()

def _combine_signed(registers: list[int], bit_width: int) -> int:
    raw = 0
    for reg in registers:
        raw = (raw << 16) | (reg & 0xFFFF)
    sign_bit = 1 << (bit_width - 1)
    if raw & sign_bit:
        raw -= 1 << bit_width
    return raw


def _decode_int32(registers: list[int]) -> int:
    if len(registers) != 2:
        raise ValueError("Expected 2 registers for int32")
    return _combine_signed(registers, 32)


def _decode_int64(registers: list[int]) -> int:
    if len(registers) != 4:
        raise ValueError("Expected 4 registers for int64")
    return _combine_signed(registers, 64)

def read_all_registers(slave_id: int) -> dict[str, float | None]:
    results: dict[str, float | None] = {}
    with modbus_session() as client:
        for name, (address, count, scale) in REGISTERS.items():
            response = client.read_holding_registers(address=address, count=count, device_id=slave_id)
            if response.isError():
                logging.warning("Modbus error on %s (addr %s): %s", name, hex(address), response)
                results[name] = None
                continue

            try:
                raw = response.registers
                if count == 2:
                    value = _decode_int32(raw) / scale
                elif count == 4:
                    value = _decode_int64(raw) / scale
                else:
                    raise ValueError(f"Unsupported register width {count} for {name}")
                results[name] = round(value, 3)
            except Exception as exc:
                logging.exception("Decode failure for %s: %s", name, exc)
                results[name] = None
    return results