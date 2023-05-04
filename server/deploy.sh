torchserve --start --ts-config config.properties --model-store model-store --models instruct-pix2pix=instruct-pix2pix.mar

# python query.py --url "http://localhost:8080/predictions/instruct-pix2pix" --prompt "a photo of an astronaut riding a horse on mars" --image image.png
