from fastapi import FastAPI
from src.routes.timeSlotRouter import router as timeSlotRouter
from src.routes.teacherRouter import router as teacherRouter
from src.lib.db import engine
from sqlmodel import SQLModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],  # Allows specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)


@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)


app.include_router(teacherRouter, prefix='/teacher', tags=['Teacher'])
app.include_router(timeSlotRouter, prefix='/timeSlot', tags=['Time Slots'])


# Root Page
@app.get("/", tags=['Root'])
async def root():
    return {"message": "Welcome to the app"}
