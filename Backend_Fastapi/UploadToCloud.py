
import cloudinary
import cloudinary.uploader
import cloudinary.api
from dotenv import load_dotenv
import os

# loadAllTheEnvironment Vatibales
load_dotenv()

# All the details are taken from the environment variables
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

#Doing on the basis of Cloudinary SDK
def upload_image_to_cloudinary(image_data: bytes):
    try:
        # Upload the image to Cloudinary
        response = cloudinary.uploader.upload(
            image_data,
            resource_type="auto",  # Automatically detects the file type(Image type)
        )
        return response
    except Exception as e:
        return {"error": str(e)}