# main.py
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings
import httpx # Async HTTP client, replacement for requests
import logging
import os
from typing import Optional

# Assuming UploadToCloud.py contains an async function `upload_image_to_cloudinary`
# Make sure it's adapted for async operation if it performs I/O.
from UploadToCloud import upload_image_to_cloudinary
from fastapi.middleware.cors import CORSMiddleware

# --- Configuration Loading using Pydantic Settings ---
class Settings(BaseSettings):
    huggingface_token: str
    # Add other settings like Cloudinary keys if not handled in UploadToCloud.py
    # cloudinary_cloud_name: str = "default_cloud_name" # Example

    class Config:
        env_file = '.env' # Specify the env file

# Load settings early to catch configuration errors on startup
try:
    settings = Settings()
except Exception as e:
    # Log error and exit or raise a critical exception if config fails
    logging.critical(f"Failed to load settings from .env file: {e}")
    raise RuntimeError(f"Configuration error: {e}") from e

# --- Logging Configuration ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- Initialize FastAPI App ---
app = FastAPI(
    title="Text-to-Image Generation API",
    description="Generates images from text prompts using Hugging Face and uploads them to Cloudinary.",
    version="1.0.0"
)

# --- CORS Middleware ---
# WARNING: allow_origins=["*"] is insecure for production.
# Replace "*" with your specific frontend domain(s).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Restrict this in production!
    allow_credentials=True,
    allow_methods=["*"], # Or restrict to ['GET', 'POST'] etc.
    allow_headers=["*"],
)

# --- HTTP Client Setup ---
# Create a persistent client session for better performance (reuses connections)
# Use a context manager for lifespan events (startup/shutdown)
@app.on_event("startup")
async def startup_event():
    app.state.httpx_client = httpx.AsyncClient(timeout=60.0) # Increase timeout for potentially long image generation
    logger.info("HTTPX Client started.")
    # You could also initialize Cloudinary config here if needed globally

@app.on_event("shutdown")
async def shutdown_event():
    await app.state.httpx_client.aclose()
    logger.info("HTTPX Client closed.")

# --- Pydantic Models for Input and Output ---
class HuggingFaceInput(BaseModel):
    text: str = Field(..., min_length=1, description="The text prompt for image generation.", example="A photo of an astronaut riding a horse on the moon")
    # Example of adding optional parameters for the model
    negative_prompt: Optional[str] = Field(None, description="Concepts to avoid in the image.", example="ugly, deformed, blurry")
    # Add other parameters like guidance_scale, num_inference_steps if the model API supports them

class ImageResponse(BaseModel):
    msg: str = Field(..., example="Image generated and uploaded successfully")
    image_url: str = Field(..., example="https://res.cloudinary.com/...")
    image_id: str = Field(..., example="fastapi_generated_images/...") # Example public_id

# --- Hugging Face Configuration ---
# The model name we are using is for the text to image found in Hugging face
MODEL_NAME = "runwayml/stable-diffusion-v1-5"
HUGGING_FACE_URL = f"https://api-inference.huggingface.co/models/{MODEL_NAME}"

# --- Core Logic Functions ---
async def calling_hugging_face(payload: dict, client: httpx.AsyncClient) -> bytes:
    """
    Asynchronously calls the Hugging Face Inference API.

    Args:
        payload: The dictionary payload for the API request.
        client: The httpx.AsyncClient instance.

    Returns:
        The binary image data.

    Raises:
        HTTPException: If the API call fails or returns an error status.
    """
    headers = {
        "Authorization": f"Bearer {settings.huggingface_token}"
    }
    try:
        logger.info(f"Calling Hugging Face API for model: {MODEL_NAME}")
        response = await client.post(HUGGING_FACE_URL, headers=headers, json=payload)

        # Raise HTTP errors (4xx, 5xx)
        response.raise_for_status()

        # Check content type for safety, though Hugging Face usually returns image/jpeg
        content_type = response.headers.get("content-type")
        if content_type and 'image' not in content_type:
             logger.error(f"Hugging Face API returned unexpected content type: {content_type}. Response text: {response.text[:500]}")
             raise HTTPException(status_code=500, detail=f"Hugging Face API returned non-image content: {content_type}")

        logger.info("Successfully received image data from Hugging Face.")
        return response.content # Return the image binary data

    except httpx.TimeoutException:
        logger.error(f"Hugging Face API call timed out after {client.timeout} seconds.")
        raise HTTPException(status_code=504, detail="Hugging Face API request timed out.")
    except httpx.RequestError as e:
        logger.error(f"Error calling Hugging Face API: {e}", exc_info=True)
        # Provide a more generic error to the client for security
        raise HTTPException(status_code=503, detail=f"Service Unavailable: Could not connect to Hugging Face API. Error: {e.__class__.__name__}")
    except httpx.HTTPStatusError as e:
        logger.error(f"Hugging Face API returned error status {e.response.status_code}: {e.response.text[:500]}", exc_info=True)
        # Forward the status code if it's a client error, otherwise use 500/503
        status_code = e.response.status_code if 400 <= e.response.status_code < 500 else 500
        detail = f"Hugging Face API Error ({e.response.status_code}): {e.response.json().get('error', 'Unknown error')}" if e.response.content else f"Hugging Face API Error ({e.response.status_code})"
        raise HTTPException(status_code=status_code, detail=detail)


# --- API Endpoints ---
@app.get("/", summary="Root endpoint", description="Simple root endpoint to check if the API is running.")
def main():
    # Simple health check or info endpoint
    return {"message": "Welcome to the Text-to-Image API!"}

@app.post(
    "/generate_image/",
    response_model=ImageResponse, # Defines the successful response structure
    summary="Generate Image from Text",
    description="Takes a text prompt, generates an image using Stable Diffusion v1.5 via Hugging Face, uploads it to Cloudinary, and returns the URL.",
    tags=["Image Generation"] # Group endpoints in documentation
)
async def generate_image(
    input_data: HuggingFaceInput,
    client: httpx.AsyncClient = Depends(lambda: app.state.httpx_client) # Dependency inject the client
):
    """
    Endpoint to generate an image based on text input.
    - Validates input using HuggingFaceInput model.
    - Calls Hugging Face API asynchronously.
    - Uploads the result to Cloudinary asynchronously.
    - Returns the image URL and ID upon success.
    """
    try:
        # --- Prepare Payload for Hugging Face ---
        # Include optional parameters if provided
        payload = {"inputs": input_data.text}
        options = {"use_cache": False, "wait_for_model": True} # Ensure model is ready and avoid stale cache if needed
        parameters = {}
        if input_data.negative_prompt:
            parameters["negative_prompt"] = input_data.negative_prompt
        # Add other parameters here if needed, e.g., parameters["guidance_scale"] = 7.5

        payload["options"] = options
        if parameters:
             payload["parameters"] = parameters

        logger.info(f"Generating image for prompt: '{input_data.text}'")

        # --- Call Hugging Face API ---
        image_data = await calling_hugging_face(payload, client)

        # --- Upload to Cloudinary ---
        # The upload function itself should handle its errors and potentially raise HTTPException
        # Ensure upload_image_to_cloudinary is async and handles errors properly
        logger.info("Uploading generated image to Cloudinary...")
        cloudinary_response = await upload_image_to_cloudinary(image_data) # Assuming this is now async

        # Check if the assumed async upload function returned an error dict (alternative to raising HTTPException)
        # if "error" in cloudinary_response:
        #     logger.error(f"Cloudinary upload failed: {cloudinary_response['error']}")
        #     raise HTTPException(status_code=500, detail=f"Failed to upload image to Cloudinary: {cloudinary_response['error']}")

        logger.info(f"Image successfully generated and uploaded. URL: {cloudinary_response['secure_url']}")

        # --- Return Success Response ---
        # Use the defined ImageResponse model structure
        return ImageResponse(
            msg="Image generated and uploaded successfully",
            image_url=cloudinary_response['secure_url'], # Use secure_url from Cloudinary response
            image_id=cloudinary_response['public_id']   # Use public_id from Cloudinary response
        )

    except HTTPException as e:
        # Re-raise HTTPExceptions directly (from calling_hugging_face or upload_image_to_cloudinary)
        raise e
    except Exception as e:
        # Catch any other unexpected errors during the process
        logger.error(f"An unexpected error occurred in /generate_image endpoint: {str(e)}", exc_info=True)
        # Return a generic 500 error to the client
        raise HTTPException(status_code=500, detail=f"An internal server error occurred: {str(e)}")

# --- Uvicorn Runner (for local development) ---
# To run: uvicorn main:app --reload
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
#     # Note: Reload works best for development. For production, use a process manager like Gunicorn with Uvicorn workers.
#     # Example: gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
