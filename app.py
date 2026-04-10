import os
from flask import Flask, render_template, request, Response, stream_with_context, jsonify


app = Flask(__name__)



# Pages
@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, port=8001, host="0.0.0.0")