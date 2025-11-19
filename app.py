import os

from dotenv import load_dotenv
from flask import Flask, jsonify

from modbus_client import read_all_registers

load_dotenv()

app = Flask(__name__)

@app.route("/")
def index():
    return "Backend online"

@app.route("/api/device-data")
def device_data():
    slave_id = int(os.getenv("MODBUS_SLAVE_ID", 1))
    data = read_all_registers(slave_id)
    return jsonify({"slave_id": slave_id, "data": data})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)