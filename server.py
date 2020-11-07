from flask import Flask, request, jsonify
import json
import tempfile
import os
import requests
from PIL import Image
import base64


app = Flask(__name__)


@app.route("/", methods=["POST"])
def post():
    file = request.json
    image_bin = requests.get(file["img"]).content
    f = tempfile.TemporaryFile(dir=os.path.dirname(__file__))
    f.write(image_bin)
    image = Image.open(f)
    # do jasper function
    f.seek(0)
    ncoded_string = base64.b64encode(f.read())
    f.close()
    return jsonify({"image": ncoded_string.decode("utf-8")})


@app.route("/", methods=["GET"])
def get():
    file = request.args.get("image")
    image_bin = requests.get(file).content
    f = tempfile.TemporaryFile(dir=os.path.dirname(__file__))
    f.write(image_bin)
    image = Image.open(f)
    # do jasper function
    f.seek(0)
    ncoded_string = base64.b64encode(f.read())
    f.close()

    return f'''<!DOCTYPE html>
<html>  
<body>
<img src="data:image/jpg;base64,{ncoded_string.decode("utf-8")}"></img>
</body>
</html>'''


if __name__ == "__main__":
    app.run(debug=True)
