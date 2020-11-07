from flask import Flask, request, jsonify
import json
import tempfile
import os
import requests
from PIL import Image
import base64


app = Flask(__name__)


def get_encoded_string(url):
    image_bin = requests.get(url).content
    f = tempfile.TemporaryFile(dir=os.path.dirname(__file__))
    f.write(image_bin)
    image = Image.open(f)
    # do jasper function
    f.seek(0)
    encoded_string = base64.b64encode(f.read())
    f.close()
    return encoded_string


@app.route("/", methods=["POST"])
def post():
    file = request.json
    ncoded_string = get_encoded_string(file["img"])
    return jsonify({"image": ncoded_string.decode("utf-8")})


@app.route("/", methods=["GET"])
def get():
    file = request.args.get("image")
    ncoded_string = get_encoded_string(file)

    return f'''<!DOCTYPE html>
<html>  
<body>
<img src="data:image/jpg;base64,{ncoded_string.decode("utf-8")}"></img>
</body>
</html>'''


if __name__ == "__main__":
    app.run(debug=True)
