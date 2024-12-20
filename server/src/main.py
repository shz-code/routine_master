from fastapi import FastAPI

app = FastAPI()

# Root Page
@app.get("/", tags=['Root'])
async def root():
    return {"message": "Welcome to the app"}
