from io import BytesIO
from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin
import json
from flask_csp.csp import csp_header
import tempfile
import requests
from PIL import Image
import base64
import torch
import os
import numpy as np
import argparse
import torchvision.transforms as transforms
from torch.autograd import Variable
import torchvision.utils as vutils
from Transformer import Transformer
from glob import glob

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
models = []
valid_ext = ['.jpg', '.png']
for i,weights in enumerate(glob('./pretrained_model/*.pth')):
    models.append(Transformer())
    models[i].load_state_dict(torch.load(weights))
    models[i].eval()
    models[i].cpu()
    print(weights)
# model.load_state_dict(torch.load(os.path.join(
#     './pretrained_model', 'Shinkai_net_G_float.pth')))
# model.eval()
# model.cpu()
i = 0


def convert_image(input_image, i):
    print('here')
    orig_h = input_image.size[0]
    orig_w = input_image.size[1]
    if orig_h > 480 or orig_w > 480:
        if orig_h > 480:
            ratio = 480 / orig_h
        else:
            ratio = 480 / orig_w
        h = int(ratio * orig_h)
        w = int(ratio * orig_w)
    else:
        h = orig_h
        w = orig_w
    input_image = input_image.resize((h, w), Image.BICUBIC)
    input_image = np.asarray(input_image)
    input_image = input_image[:, :, [2, 1, 0]]
    input_image = transforms.ToTensor()(input_image).unsqueeze(0)
    input_image = -1 + 2 * input_image
    input_image = Variable(input_image, volatile=True).float()
    output_image = models[i](input_image)
    output_image = output_image[0]
    output_image = output_image[[2, 1, 0], :, :]
    output_image = output_image.data.cpu().float() * 0.5 + 0.5
    output_image = transforms.ToPILImage()(output_image)
    output_image = output_image.resize((orig_h, orig_w), Image.BICUBIC)
    print('finished running')
    return output_image


def get_encoded_string(byte_file,i):
    img = Image.open(BytesIO(base64.b64decode(byte_file)))
    output_image = convert_image(img,i)
    buffered = BytesIO()
    output_image.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue())
    return img_str


@app.route("/", methods=["POST"])
@csp_header({'default-src': "'https: wss: blob: '", 'script-src': "'self'"})
# @csp_header()
def post():
    file = json.loads(request.data.decode('utf-8'))
    try:
        ncoded_string = get_encoded_string(
            file["img"].split('data:image/png;base64,')[1], int(file["style"]))
        resp = Response(json.dumps(
            {"img": f'data:image/jpg;base64,{ncoded_string.decode("utf-8")}'}), status=200, mimetype='application/json')
        return build_actual_response(resp)
    except:
        return file["img"]


@app.route("/", methods=["GET"])
def get():
    # with open('')
    # file = request.args.get("image")
    file = Image.open('test_img.jpg')
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
    response.headers.add("origin", "*")
    return response


if __name__ == "__main__":
    app.run(debug=True)
