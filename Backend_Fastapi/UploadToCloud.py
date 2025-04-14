# UploadToCloud.py
import cloudinary
import cloudinary.uploader
import cloudinary.api
from pydantic_settings import BaseSettings
import logging
from fastapi import HTTPException

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class CloudinarySettings(BaseSettings):
    cloudinary_cloud_name: str
    cloudinary_api_key: str
    cloudinary_api_secret: str

    class Config:
        env_file = '.env'

# Load settings
settings = CloudinarySettings()

# Configure Cloudinary SDK
cloudinary.config(
    cloud_name = settings.cloudinary_cloud_name,
    api_key = settings.cloudinary_api_key,
    api_secret = settings.cloudinary_api_secret,
    secure = True # Use https
)

async def upload_image_to_cloudinary(image_data: bytes, public_id_prefix: str = "generated_image") -> dict:
    """
    Asynchronously uploads image data to Cloudinary.

    Args:
        image_data: The binary image data.
        public_id_prefix: Optional prefix for the public ID in Cloudinary.

    Returns:
        A dictionary containing the upload result from Cloudinary
        or an error dictionary.
    """
    try:
        logger.info("Attempting to upload image to Cloudinary...")
        # The upload function from the official library is synchronous,
        # but we run it in a thread pool implicitly if needed by the framework,
        # or explicitly if running standalone async code outside FastAPI/Starlette.
        # For FastAPI, simply calling it should be okay as FastAPI handles sync functions.
        # However, for pure async, you'd use asyncio.to_thread (Python 3.9+)
        # or run_in_executor. Let's assume FastAPI handles it here.
        upload_result = cloudinary.uploader.upload(
            image_data,
            folder="fastapi_generated_images", # Optional: organize in a folder
            resource_type="image",
            # public_id=f"{public_id_prefix}_{uuid.uuid4()}" # Example using UUID
        )
        logger.info(f"Successfully uploaded image. Public ID: {upload_result.get('public_id')}")
        # Ensure essential keys are present
        if 'secure_url' not in upload_result or 'public_id' not in upload_result:
             logger.error("Cloudinary response missing 'secure_url' or 'public_id'")
             raise HTTPException(status_code=500, detail="Cloudinary upload failed: Invalid response format.")

        return {
            "secure_url": upload_result.get('secure_url'),
            "public_id": upload_result.get('public_id'),
            "original_filename": upload_result.get('original_filename'),
             # Add other relevant fields if needed
        }
    except HTTPException as http_exc: # Re-raise FastAPI's HTTP exceptions
        raise http_exc
    except Exception as e:
        logger.error(f"Cloudinary upload failed: {str(e)}", exc_info=True)
        # Return a dictionary indicating error for the main endpoint to handle
        # Or raise HTTPException directly
        # return {"error": str(e)}
        raise HTTPException(status_code=500, detail=f"Cloudinary upload failed: {str(e)}")
