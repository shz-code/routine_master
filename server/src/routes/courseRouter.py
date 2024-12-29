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


@router.get("/{id}", response_model=Course)
async def get_course(id: int, db: Session = Depends(get_db)):
    course = db.exec(select(Course).where(Course.id == id)).first()
    return course


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


@router.patch("/{id}", status_code=status.HTTP_200_OK)
async def edit_course(id: int, course: Course, db: Session = Depends(get_db)):
    # Check if course already exists
    existing_course = db.exec(select(Course).where(
        (Course.courseCode == course.courseCode) & (Course.id != id))).first()
    if existing_course:
        raise HTTPException(
            status_code=400, detail="Course with this code already exists.")

    # Update the course
    existing_course = db.exec(
        select(Course).where(Course.id == id)).first()

    if not existing_course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found."
        )

    for key, value in course.model_dump(exclude_unset=True).items():
        setattr(existing_course, key, value)

    # Commit the changes
    db.commit()
    db.refresh(existing_course)
    return existing_course


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_course(id: int, db: Session = Depends(get_db)):
    course = db.exec(select(Course).where(Course.id == id)).first()

    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found."
        )

    db.delete(course)
    db.commit()
    return None
