import time
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlmodel import Session, select

from src.lib.db import get_db
from src.models.timeSlot import TimeSlot

router = APIRouter()


@router.get("", response_model=list[TimeSlot])
async def get_time_slots(db: Session = Depends(get_db)):
    timeSlots = db.exec(select(TimeSlot)).all()
    return timeSlots


@router.get("/{id}", response_model=TimeSlot)
async def get_timeSlot(id: int, db: Session = Depends(get_db)):
    timeSlot = db.exec(select(TimeSlot).where(TimeSlot.id == id)).first()
    return timeSlot


@router.post("", status_code=status.HTTP_201_CREATED)
async def get_time_slots(timeSlot: TimeSlot, db: Session = Depends(get_db)):
    db.add(timeSlot)
    db.commit()
    db.refresh(timeSlot)
    return timeSlot


@router.patch("/{id}", status_code=status.HTTP_200_OK)
async def edit_timeSlot(id: int, timeSlot: TimeSlot, db: Session = Depends(get_db)):
    # Check if timeSlot already exists
    existing_timeSlot = db.exec(
        select(TimeSlot).where(TimeSlot.id == id)).first()

    if not existing_timeSlot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="TimeSlot not found."
        )

    # Update the timeSlot
    for key, value in timeSlot.model_dump(exclude_unset=True).items():
        setattr(existing_timeSlot, key, value)

    # Commit the changes
    db.commit()
    db.refresh(existing_timeSlot)
    return existing_timeSlot


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_timeSlot(id: int, db: Session = Depends(get_db)):
    timeSlot = db.exec(select(TimeSlot).where(TimeSlot.id == id)).first()

    if not timeSlot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="TimeSlot not found."
        )

    db.delete(timeSlot)
    db.commit()
    return None
