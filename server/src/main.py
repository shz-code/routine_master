from fastapi import FastAPI
from src.routes.teacherRouter import router as teacherRouter
from src.lib.db import engine
from sqlmodel import SQLModel

app = FastAPI()

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)


app.include_router(teacherRouter, prefix='/teacher', tags=['Teacher'])


# Root Page
@app.get("/", tags=['Root'])
async def root():
    return {"message": "Welcome to the app"}
