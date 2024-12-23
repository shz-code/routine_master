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


@router.post("", status_code=status.HTTP_201_CREATED)
async def get_time_slots(timeSlot: TimeSlot, db: Session = Depends(get_db)):
    db.add(timeSlot)
    db.commit()
    db.refresh(timeSlot)
    return timeSlot
