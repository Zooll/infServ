import io
import base64
import json
import argparse
from datetime import datetime

import numpy as np
import requests
from PIL import Image


def decode(data):
    data = base64.b64decode(data)
    data = io.BytesIO(data)
    return Image.open(data)


def encode(data):
    buffer = io.BytesIO()
    data.save(buffer, format="JPEG")
    data = base64.b64encode(buffer.getvalue())
    return data.decode("utf-8")


parser = argparse.ArgumentParser()
parser.add_argument(
    "--model-name", type=str, required=True, help="Model name"
)
parser.add_argument(
    "--prompt", type=str, required=True, help="Prompt for image generation"
)
parser.add_argument(
    "--image", type=str, required=True, help="Image for image generation"
)
parser.add_argument(
    "--filename",
    type=str,
    default="output-{}.jpg".format(str(datetime.now().strftime("%Y%m%d%H%M%S"))),
    help="Filename of output image",
)
args = parser.parse_args()

url = f"http://localhost:8080/predictions/{args.model_name}"

image = Image.open(args.image)
# decode(encode(image))

response = requests.post(url, data={"image": encode(image), "prompt": args.prompt}).json()

print(response)

# Contruct image from response
image = decode(response["image"])
image.save(args.filename)
