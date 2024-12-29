from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from src.models.semester import Semester
from src.lib.db import get_db

router = APIRouter()


@router.get("", response_model=list[Semester])
async def get_semesters(db: Session = Depends(get_db)):
    semesters = db.exec(select(Semester)).all()
    return semesters


@router.get("/{id}", response_model=Semester)
async def get_semester(id: int, db: Session = Depends(get_db)):
    semester = db.exec(select(Semester).where(Semester.id == id)).first()
    return semester


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


@router.patch("/{id}", status_code=status.HTTP_200_OK)
async def edit_semester(id: int, semester: Semester, db: Session = Depends(get_db)):
    print(id)
    # Check if any other semester is within the same time frame
    existing_semester = db.exec(
        select(Semester).where(
            (Semester.startDate <= semester.endDate) &
            (Semester.endDate >= semester.startDate) & (Semester.id != id)
        )
    ).first()

    if existing_semester:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A semester already exists within the given time frame."
        )

    # Update the semester
    existing_semester = db.exec(
        select(Semester).where(Semester.id == id)).first()

    if not existing_semester:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Semester not found."
        )

    for key, value in semester.model_dump(exclude_unset=True).items():
        setattr(existing_semester, key, value)

    # Commit the changes
    db.commit()
    db.refresh(existing_semester)
    return existing_semester


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_semester(id: int, db: Session = Depends(get_db)):
    semester = db.exec(select(Semester).where(Semester.id == id)).first()

    if not semester:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Semester not found."
        )

    db.delete(semester)
    db.commit()
    return None
