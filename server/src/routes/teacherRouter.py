from fastapi import APIRouter, HTTPException
from fastapi.params import Depends
from sqlmodel import Session, select
from src.lib.db import get_db
from src.models.teacher import Teacher
from fastapi import status
from pydantic import BaseModel
router = APIRouter()


@router.get('', response_model=list[Teacher])
async def get_all_teachers(db: Session = Depends(get_db)):
    teachers = db.exec(select(Teacher)).all()
    return teachers

# Pydantic model for input
class TeacherCreate(BaseModel):
    name: str
    code: str

@router.post('', response_model=Teacher, status_code=status.HTTP_201_CREATED)
async def create_teacher(teacher: TeacherCreate, db: Session = Depends(get_db)):
    # Check if code already exists
    existing_teacher = db.exec(select(Teacher).where(Teacher.code == teacher.code)).first()
    if existing_teacher:
        raise HTTPException(status_code=400, detail="Teacher with this code already exists.")
        
    teacher = Teacher(**teacher.dict())
    db.add(teacher)
    db.commit()
    db.refresh(teacher)
    return teacher
