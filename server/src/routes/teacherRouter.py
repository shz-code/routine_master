from fastapi import APIRouter, HTTPException, Request
from fastapi.params import Depends
from sqlmodel import Session, select
from fastapi import status

from src.lib.db import get_db
from src.models.teacher import Teacher
router = APIRouter()


@router.get('', response_model=list[Teacher])
async def get_all_teachers(db: Session = Depends(get_db)):
    teachers = db.exec(select(Teacher)).all()
    return teachers


@router.post('', status_code=status.HTTP_201_CREATED)
async def create_teacher(req: Request, db: Session = Depends(get_db)):
    # Get form data
    data = await req.form()
    # Extract data from form
    name = data.get('name')
    email = data.get('email')
    phoneNo = data.get('phoneNo')
    shortCode = data.get('shortCode')
    file = data.get('file')

    if file != 'null':
        # Save file
        with open(f"uploads/{file.filename}", "wb") as f:
            f.write(file.file.read())
    else:
        # Check if code already exists
        existing_teacher = db.exec(select(Teacher).where(
            Teacher.shortCode == shortCode)).first()
        if existing_teacher:
            raise HTTPException(
                status_code=400, detail="Teacher with this code already exists.")

        teacher = Teacher(name=name, email=email,
                          phoneNo=phoneNo, shortCode=shortCode)
        db.add(teacher)
        db.commit()
        db.refresh(teacher)
        return teacher

    return []
