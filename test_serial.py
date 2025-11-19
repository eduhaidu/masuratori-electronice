"""
Test script to list available COM ports and test connection to Modbus device.
Run this to diagnose connection issues before running the main app.
"""
import os
import sys
from dotenv import load_dotenv

load_dotenv()

def list_all_ports():
    """List all available COM ports on the system."""
    print("=" * 60)
    print("AVAILABLE COM PORTS")
    print("=" * 60)
    
    try:
        import serial.tools.list_ports
        ports = serial.tools.list_ports.comports()
        
        if not ports:
            print("❌ No COM ports found on this system.")
            return []
        
        for port in ports:
            print(f"\n✓ Port: {port.device}")
            print(f"  Description: {port.description}")
            print(f"  Hardware ID: {port.hwid}")
            if port.manufacturer:
                print(f"  Manufacturer: {port.manufacturer}")
        
        return [port.device for port in ports]
    
    except ImportError:
        print("❌ pyserial not installed. Install with: pip install pyserial")
        return []


def test_port_access(port_name):
    """Test if we can open a specific port."""
    print(f"\n{'=' * 60}")
    print(f"TESTING PORT: {port_name}")
    print("=" * 60)
    
    try:
        import serial
        
        # Try to open the port
        ser = serial.Serial(
            port=port_name,
            baudrate=int(os.getenv("MODBUS_BAUDRATE", 19200)),
            parity=os.getenv("MODBUS_PARITY", "E"),
            stopbits=int(os.getenv("MODBUS_STOPBITS", 1)),
            timeout=float(os.getenv("MODBUS_TIMEOUT", 3))
        )
        
        print(f"✓ Successfully opened {port_name}")
        print(f"  Baudrate: {ser.baudrate}")
        print(f"  Parity: {ser.parity}")
        print(f"  Stopbits: {ser.stopbits}")
        print(f"  Timeout: {ser.timeout}s")
        
        ser.close()
        print(f"✓ Successfully closed {port_name}")
        return True
        
    except serial.SerialException as e:
        error_msg = str(e).lower()
        
        if "access is denied" in error_msg or "permissionerror" in error_msg:
            print(f"❌ PERMISSION DENIED")
            print(f"   Port {port_name} is being used by another application.")
            print(f"   Close any programs using this port (Modbus Poll, PuTTY, etc.)")
            
        elif "cannot find" in error_msg or "does not exist" in error_msg:
            print(f"❌ PORT NOT FOUND")
            print(f"   Port {port_name} does not exist on this system.")
            print(f"   Check Device Manager for the correct COM port number.")
            
        elif "could not open port" in error_msg:
            print(f"❌ CANNOT OPEN PORT")
            print(f"   Possible causes:")
            print(f"   - Port is in use by another application")
            print(f"   - Driver not installed correctly")
            print(f"   - USB cable disconnected")
            
        else:
            print(f"❌ ERROR: {e}")
        
        return False
    
    except ImportError:
        print("❌ pyserial not installed. Install with: pip install pyserial")
        return False
    
    except Exception as e:
        print(f"❌ UNEXPECTED ERROR: {type(e).__name__}: {e}")
        return False


def test_modbus_connection():
    """Test Modbus connection using pymodbus."""
    print(f"\n{'=' * 60}")
    print("TESTING MODBUS CONNECTION")
    print("=" * 60)
    
    port = os.getenv("MODBUS_PORT", "COM3")
    slave_id = int(os.getenv("MODBUS_SLAVE_ID", 2))
    
    try:
        from pymodbus.client import ModbusSerialClient
        
        print(f"Creating Modbus client for {port}...")
        client = ModbusSerialClient(
            port=port,
            baudrate=int(os.getenv("MODBUS_BAUDRATE", 19200)),
            parity=os.getenv("MODBUS_PARITY", "E"),
            stopbits=int(os.getenv("MODBUS_STOPBITS", 1)),
            timeout=float(os.getenv("MODBUS_TIMEOUT", 3)),
        )
        
        print(f"Attempting to connect...")
        if not client.connect():
            print(f"❌ Failed to connect to {port}")
            print(f"   Check physical connection and port settings.")
            return False
        
        print(f"✓ Connected successfully!")
        
        # Try to read a simple register (Device ID area)
        print(f"Attempting to read register from slave {slave_id}...")
        response = client.read_holding_registers(address=0x1802, count=2, unit=slave_id)
        
        if response.isError():
            print(f"❌ Modbus Error: {response}")
            print(f"   Possible causes:")
            print(f"   - Wrong slave ID (current: {slave_id})")
            print(f"   - Device not responding")
            print(f"   - Wrong RS485 wiring (swap A/B)")
            print(f"   - Wrong baud rate or parity settings")
        else:
            print(f"✓ Successfully read registers: {response.registers}")
            print(f"✓ Device is responding correctly!")
        
        if client.connected:
            client.close()
            print(f"✓ Connection closed")
        
        return True
        
    except ImportError as e:
        print(f"❌ Missing library: {e}")
        print(f"   Install with: pip install pymodbus")
        return False
    
    except Exception as e:
        print(f"❌ ERROR: {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()
        return False


def main():
    """Run all diagnostic tests."""
    print("\n🔍 SERIAL PORT & MODBUS DIAGNOSTICS")
    print("=" * 60)
    
    # Check .env configuration
    print(f"\n📋 Configuration from .env:")
    print(f"   MODBUS_PORT: {os.getenv('MODBUS_PORT', 'NOT SET')}")
    print(f"   MODBUS_BAUDRATE: {os.getenv('MODBUS_BAUDRATE', 'NOT SET')}")
    print(f"   MODBUS_PARITY: {os.getenv('MODBUS_PARITY', 'NOT SET')}")
    print(f"   MODBUS_STOPBITS: {os.getenv('MODBUS_STOPBITS', 'NOT SET')}")
    print(f"   MODBUS_SLAVE_ID: {os.getenv('MODBUS_SLAVE_ID', 'NOT SET')}")
    print(f"   MODBUS_TIMEOUT: {os.getenv('MODBUS_TIMEOUT', 'NOT SET')}")
    
    # Step 1: List all ports
    available_ports = list_all_ports()
    
    if not available_ports:
        print("\n⚠️  No COM ports detected. Connect your USB-RS485 adapter and try again.")
        return
    
    # Step 2: Test the configured port
    configured_port = os.getenv("MODBUS_PORT", "COM3")
    
    if configured_port not in available_ports:
        print(f"\n⚠️  WARNING: Configured port {configured_port} not found in available ports!")
        print(f"   Available ports: {', '.join(available_ports)}")
        print(f"   Update .env file with correct port name.")
    else:
        test_port_access(configured_port)
    
    # Step 3: Test Modbus connection
    test_modbus_connection()
    
    print("\n" + "=" * 60)
    print("DIAGNOSTICS COMPLETE")
    print("=" * 60)


if __name__ == "__main__":
    main()
