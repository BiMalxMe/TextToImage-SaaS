from fastapi import FastAPI
from pydantic import BaseModel
import os
import requests
from dotenv import load_dotenv


#IntitalizingTheFastApiAPp
app = FastAPI()


# We should import the package pip install dot-env to access the variables of the main .env file
# As we can acess and To get the specific vaiables we need to do
# secret_key=os.getenv("Secret") ,Insidee the function there we can put the vatiable available in the .env


# This does the validation of data imported from the pydantic library
#  If it is expecting text as a string then if int is passed it throws error
class HuggingFace(BaseModel):
    text: str

#In this we are taking the api key by using .env variable
secret_key=os.getenv("Huggingface_Token")

#The model name we are using is for the text to image found in the Hugging face
# ITs ai model and our data is sent and processed at thee models environmet
MODEL_NAME = "CompVis/stable-diffusion-v-1-4-original"

#This is the main urL of the Hugging face where our input adata are sent to
HUGGING_FACE_URL = f"https://api-inference.huggingface.co/models/{MODEL_NAME}"


@app.get("/")
def read_root():
    return {"Hello": "World","Secret":secret_key}
