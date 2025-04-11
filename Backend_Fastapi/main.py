from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import requests
from dotenv import load_dotenv
from fastapi.responses import Response
from UploadToCloud import upload_image_to_cloudinary
from fastapi.middleware.cors import CORSMiddleware


#IntitalizingTheFastApiAPp
app = FastAPI()
load_dotenv()

#all url can send the request to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  #after deployment use domain name
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# We should import the package pip install dot-env to access the variables of the main .env file
# As we can acess and To get the specific vaiables we need to do
# secret_key=os.getenv("Secret") ,Insidee the function there we can put the vatiable available in the .env


# This does the validation of data imported from the pydantic library
#  If it is expecting text as a string then if int is passed it throws error
class HuggingFaceInput(BaseModel):
    text: str

#In this we are taking the api key by using .env variable
secret_key = os.getenv("HUGGINGFACE_TOKEN")
if not secret_key:
    raise HTTPException(status_code=500, detail="Huggingface_Token not found in the .env file")

#The model name we are using is for the text to image found in Hugging face
# ITs ai model and our data is sent and processed at thee models environmet
MODEL_NAME = "runwayml/stable-diffusion-v1-5"

#This is the main urL of the Hugging face where our input adata are sent to
HUGGING_FACE_URL = f"https://api-inference.huggingface.co/models/{MODEL_NAME}"


#Payload Or Data expects a Dictionary type (I Think the SDK Expects it) 
# Dict is like person = {
#     "name": "Bimal",
#     "age": 20,
#     "city": "Nepali New York i.e Ratnapark"
# }


#The data should come in a type of key value pair
#Authorization Headers are Sent using the api key


def calling_hugging_face(payload: dict):
    headers = {
        "Authorization": f"Bearer {secret_key}"  
    }
    #rEQUEST LIBRARY IS USED FOR THE CALLING APIS
    # OUR data is sent in the form of json as the dict is already in that format
    response = requests.post(HUGGING_FACE_URL, headers=headers, json=payload)
    
    # If the response status code is not 200, raise an error
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error from Hugging Face API")
    
    return response.content  # Return the image binary data

#Whenever the i sent at its url/generate-image it runs the generate_image fn automaticaly
@app.get("/")
def main():
    return {"msg": "bimal"}

@app.post("/generate_image/")
# input_data Should be in Correct data format as defined above in HuggingFaceInput Class@app.post("/generate_image/")

def generate_image(input_data: HuggingFaceInput):
    try:
        # Formatting input in the certain way 
        # {
        #      "inputs": _________#TextUserWantToSend
        # }
        payload = {"inputs": input_data.text}

        # Gathering all the content returned by the Hugging Face Model
        image_data = calling_hugging_face(payload)

        # Uploading the image to Cloudinary
        cloudinary_response = upload_image_to_cloudinary(image_data)

        # ByChance Errror Occurred
        if "error" in cloudinary_response:
            return {"msg": f"Error occurred while uploading to Cloudinary: {cloudinary_response['error']}"}
        
        # return These keys to the FE
        return {
            "msg": "Image uploaded successfully",
            "image_url": cloudinary_response['secure_url'],  # Image URL 
            "image_id": cloudinary_response['public_id']  # Image ID 
        }

    except Exception as e:
        # Handle errors during the Hugging Face or Cloudinary upload process
        return {"msg": f"An error occurred: {str(e)}"}