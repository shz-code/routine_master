from fastapi import APIRouter, HTTPException, Request
from fastapi.params import Depends
from sqlmodel import Session, select
from fastapi import status

from src.models.course import Course
from src.lib.db import get_db
router = APIRouter()


@router.get('', response_model=list[Course])
async def get_all_courses(db: Session = Depends(get_db)):
    courses = db.exec(select(Course)).all()
    return courses


@router.post('', status_code=status.HTTP_201_CREATED)
async def create_course(req: Request, db: Session = Depends(get_db)):
    # Get form data
    data = await req.form()

    # Extract data from form
    courseName = data.get('courseName')
    courseCode = data.get('courseCode')
    creditHours = data.get('creditHours')
    file = data.get('file')

    if file != 'null':
        # Save file
        with open(f"uploads/{file.filename}", "wb") as f:
            f.write(file.file.read())
    else:
        # Check if code already exists
        existing_course = db.exec(select(Course).where(
            Course.courseCode == courseCode)).first()
        if existing_course:
            raise HTTPException(
                status_code=400, detail="Course with this code already exists.")

        course = Course(courseName=courseName, courseCode=courseCode,
                        creditHours=creditHours)
        db.add(course)
        db.commit()
        db.refresh(course)
        return course

    return []
