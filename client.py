import requests
import json

url = 'http://127.0.0.1:5000'
my_img = {'img': "https://waa.ai/tjdB.jpg"}
r = requests.post(url, json=my_img)
print(r.content.decode("utf-8"))
