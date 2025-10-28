from flask import Flask, render_template

# Inițializăm aplicația Flask
app = Flask(__name__)

# Definim o rută pentru pagina principală ("/")
@app.route('/')
def index():
    return "ok mere"

# Această condiție asigură că serverul rulează doar
# dacă scriptul este executat direct (nu importat)
if __name__ == '__main__':
    app.run(debug=True)