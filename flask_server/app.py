from flask import Flask, request
from flask_cors import CORS, cross_origin
import logging
import base64
import requests

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')
logging.getLogger().addHandler(logging.StreamHandler())


app = Flask(__name__)
#cors = CORS(app)

model_name = 'instruct-pix2pix'
TORCHSERVE_URL = f'http://localhost:8080/predictions/{model_name}'

@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    # Get the base64 encoded image from the request
    base64_image = request.form['image']
    prompt = request.form['prompt']
    # Send the image to TorchServe for inference

    data = {'image': base64_image, 'prompt': prompt}
    logging.info('sent request')
    response = requests.post(TORCHSERVE_URL, data=data)

    logging.info('response', response.json())
    return response.json()

if __name__ == '__main__':
    app.run(host="0.0.0.0")