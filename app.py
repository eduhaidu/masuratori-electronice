from flask import Flask, render_template

# Inițializăm aplicația Flask
app = Flask(__name__)

# Definim o rută pentru pagina principală ("/")
@app.route('/')
def index():
    # 'render_template' va căuta și randa fișierul 'index.html'
    # din folderul 'templates'
    return render_template('index.html')

# Această condiție asigură că serverul rulează doar
# dacă scriptul este executat direct (nu importat)
if __name__ == '__main__':
    app.run(debug=True)