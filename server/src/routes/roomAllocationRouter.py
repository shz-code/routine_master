from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from sqlalchemy.orm import joinedload
from src.lib.db import get_db
from src.models.roomAllocation import RoomAllocation, RoomAllocationRead

router = APIRouter()


@router.get("", response_model=list[RoomAllocationRead])
async def get_roomAllocations(db: Session = Depends(get_db)):
    roomAllocations = db.exec(
        select(RoomAllocation).options()).all()
    print(roomAllocations)
    return roomAllocations


@router.get("/{id}", response_model=RoomAllocationRead)
async def get_roomAllocation(id: int, db: Session = Depends(get_db)):
    roomAllocation = db.exec(select(RoomAllocation).where(
        RoomAllocation.id == id)).first()
    return roomAllocation


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_roomAllocation(roomAllocation: RoomAllocation, db: Session = Depends(get_db)):
    validityCheck = db.exec(select(RoomAllocation).where(
        (RoomAllocation.semester_id == roomAllocation.semester_id) & (RoomAllocation.timeSlot_id == roomAllocation.timeSlot_id))).first()

    if validityCheck:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Room Allocation for this timeslot already exists."
        )

    db.add(roomAllocation)
    db.commit()
    db.refresh(roomAllocation)
    return roomAllocation


@router.patch("/{id}", response_model=RoomAllocationRead, status_code=status.HTTP_200_OK)
async def edit_roomAllocation(id: int, roomAllocation: RoomAllocation, db: Session = Depends(get_db)):
    validityCheck = db.exec(select(RoomAllocation).where(
        (RoomAllocation.semester_id == roomAllocation.semester_id) & (RoomAllocation.timeSlot_id == roomAllocation.timeSlot_id) & (RoomAllocation.id != id))).first()

    if validityCheck:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Room Allocation for this timeslot already exists."
        )

    # Check if roomAllocation already exists
    existing_roomAllocation = db.exec(
        select(RoomAllocation).where(RoomAllocation.id == id)).first()

    if not existing_roomAllocation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Room Allocation not found."
        )

    # Update the roomAllocation
    for key, value in roomAllocation.model_dump(exclude_unset=True).items():
        setattr(existing_roomAllocation, key, value)

    if (existing_roomAllocation.rooms < existing_roomAllocation.bookedRooms):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Room Allocation cannot be less than booked rooms."
        )

    # Commit the changes
    db.commit()
    db.refresh(existing_roomAllocation)
    return existing_roomAllocation


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_roomAllocation(id: int, db: Session = Depends(get_db)):
    roomAllocation = db.exec(select(RoomAllocation).where(
        RoomAllocation.id == id)).first()

    if not roomAllocation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Room Allocation not found."
        )

    db.delete(roomAllocation)
    db.commit()
    return None
