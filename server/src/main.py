from fastapi import FastAPI
from src.routes.semesterRouter import router as semesterRouter
from src.routes.courseRouter import router as courseRouter
from src.routes.timeSlotRouter import router as timeSlotRouter
from src.routes.teacherRouter import router as teacherRouter
from src.routes.roomAllocationRouter import router as roomAllocationRouter
from src.lib.db import engine
from sqlmodel import SQLModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173',
                   'http://localhost:5174'],  # Allows specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)


@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)


app.include_router(teacherRouter, prefix='/teacher', tags=['Teachers'])
app.include_router(courseRouter, prefix='/course', tags=['Courses'])
app.include_router(timeSlotRouter, prefix='/timeSlot', tags=['Time Slots'])
app.include_router(semesterRouter, prefix='/semester', tags=['Semesters'])
app.include_router(roomAllocationRouter,
                   prefix='/roomAllocation', tags=['Room Allocation'])


# Root Page
@app.get("/", tags=['Root'])
async def root():
    return {"message": "Welcome to the app"}
