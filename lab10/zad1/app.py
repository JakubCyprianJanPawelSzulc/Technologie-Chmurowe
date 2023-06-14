from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Tschuss!'

if __name__ == '__main__':
    app.run(host='', port=5000, debug=True)