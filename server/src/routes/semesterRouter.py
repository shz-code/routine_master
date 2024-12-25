from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlmodel import Session, select

from src.models.semester import Semester
from src.lib.db import get_db

router = APIRouter()


@router.get("", response_model=list[Semester])
async def get_semesters(db: Session = Depends(get_db)):
    semesters = db.exec(select(Semester)).all()
    return semesters


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_semesters(semester: Semester, db: Session = Depends(get_db)):
    # Check if any other semester is within the same time frame
    existing_semester = db.exec(
        select(Semester).where(
            (Semester.startDate <= semester.endDate) &
            (Semester.endDate >= semester.startDate)
        )
    ).first()

    if existing_semester:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A semester already exists within the given time frame."
        )
    db.add(semester)
    db.commit()
    db.refresh(semester)
    return semester
