from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json
from flask_csp.csp import csp_header
import tempfile
import os
import requests
from PIL import Image
import base64


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def get_encoded_string(url):
    image_bin = requests.get(url).content
    f = tempfile.TemporaryFile(dir=os.path.dirname(__file__))
    f.write(image_bin)
    # do jasper function
    f.seek(0)
    encoded_string = base64.b64encode(f.read())
    f.close()
    return encoded_string

@app.route("/", methods=["POST"])
@csp_header({'default-src':"'https: wss: blob: '",'script-src':"'self'"})
@csp_header()
def post():
    file = json.loads(request.data.decode('utf-8'))
    ncoded_string = get_encoded_string(file["img"])
    return build_actual_response(jsonify({"image": ncoded_string.decode("utf-8")}))


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


def build_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response
def build_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == "__main__":
    app.run(debug=True,ssl_context='adhoc')
