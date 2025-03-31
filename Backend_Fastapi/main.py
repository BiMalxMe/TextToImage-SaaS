from fastapi import FastAPI,HTTPException
from pydantic import BaseModel
import os
import requests
from dotenv import load_dotenv
from fastapi.responses import Response
import httpx



#IntitalizingTheFastApiAPp
app = FastAPI()
load_dotenv()


# We should import the package pip install dot-env to access the variables of the main .env file
# As we can acess and To get the specific vaiables we need to do
# secret_key=os.getenv("Secret") ,Insidee the function there we can put the vatiable available in the .env


# This does the validation of data imported from the pydantic library
#  If it is expecting text as a string then if int is passed it throws error
class HuggingFaceInput(BaseModel):
    text: str

#In this we are taking the api key by using .env variable
secret_key=os.getenv("Huggingface_Token")
if not secret_key:
    raise HTTPException(status_code=500, detail="Huggingface_Token not found in the .env file")

#The model name we are using is for the text to image found in the Hugging face
# ITs ai model and our data is sent and processed at thee models environmet
MODEL_NAME = "CompVis/stable-diffusion-v-1-4-original"

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
    #All the content returend by the Hugingface url is returned to the caller of the function
    return response.content 

#Whenever the i sent at its url/generate-image it runs the generate_image fn automaticaly
@app.get("/generate_image/")
# input_data Should be in Correct data format as defined above in HuggingFaceInput Class
async def generate_image(input_data: HuggingFaceInput):
        
        # Formatting input in the cetain way 
        # {
        #      "input": _________#TextUserWantToSend
        # }
        payload = {"inputs": "man"}

        #Gathering all the content retrned by the hugging face Model
        image_data =await calling_hugging_face(payload)

        return Response(content=image_data)


