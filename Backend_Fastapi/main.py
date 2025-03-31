from fastapi import FastAPI
import os


# We should import the package pip install dot-env to access the variables of the main .env file
# As we can acess and To get the specific vaiables we need to do
# secret_key=os.getenv("Secret") ,Insidee the function there we can put the vatiable available in the .env


from dotenv import load_dotenv


secret_key=os.getenv("Secret")
app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World","Secret":secret_key}
