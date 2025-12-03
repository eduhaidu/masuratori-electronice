# Aplicație de preluare a măsurătorilor din 

### Această aplicație a fost realizată de echipa formată din membrii:
  - Libotean Cosmin - Lider
  - Bancoș Gabriel
  - Haidu Eduard
  - Mirth Kevin
  - Nistor Dorin
  - Racolța Cătălina
  - Bota Emanuel

Pentru a rula aplicația, serverul frontend (Interfața) și serverul de backend (Logica) trebuie rulate în paralel
### 2. Backend Setup

```bash
# Creare virtual environment
python3 -m venv .venv

# Activare virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Instalare dependințe
pip install flask python-dotenv pymodbus
```

### 3. Frontend Setup

```bash
cd masuratori-frontend

# Instalare dependințe
npm install

cd ..
```

## ⚙️ Configurare

### Backend - Fișier `.env`

Creează sau editează fișierul `.env` în directorul root:

```env
# Configurare port serial Modbus
MODBUS_PORT=COM8              # Windows: COM8, Linux/Mac: /dev/ttyUSB0
MODBUS_BAUDRATE=19200         # Baud rate (ex: 9600, 19200, 115200)
MODBUS_PARITY=E               # Paritate: N (None), E (Even), O (Odd)
MODBUS_STOPBITS=1             # Stop bits: 1 sau 2
MODBUS_SLAVE_ID=1             # ID slave Modbus
MODBUS_TIMEOUT=3              # Timeout în secunde
```
