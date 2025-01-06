from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlmodel import Session, select

from src.models.roomAllocation import RoomAllocation
from src.models.timeSlot import TimeSlot
from src.models.section import Section
from src.routes.sectionRouter import TeacherSections
from src.models.routine import Routine, RoutineRead
from src.lib.db import get_db

router = APIRouter()


@router.post("/teacher", response_model=list[RoutineRead])
async def get_teacher_routine(req: TeacherSections, db: Session = Depends(get_db)):
    routines = db.exec(select(Routine).join(Section, Routine.section_id == Section.id).where(
        Section.semester_id == req.semester_id, Section.teacher_id == req.teacher_id)).all()
    return routines


class CourseSection(BaseModel):
    course_id: int
    semester_id: int


@router.post("/course", response_model=list[RoutineRead])
async def get_course_routine(req: CourseSection, db: Session = Depends(get_db)):
    routines = db.exec(select(Routine).join(Section, Routine.section_id == Section.id).where(
        Section.semester_id == req.semester_id, Section.course_id == req.course_id)).all()
    return routines


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_routine(routine: Routine, db: Session = Depends(get_db)):
    # Do some validation
    section = db.exec(select(Section).where(
        Section.id == routine.section_id)).first()

    roomAllocation = db.exec(select(RoomAllocation).where(
        RoomAllocation.timeSlot_id == routine.timeSlot_id, section.semester_id == RoomAllocation.semester_id == section.semester_id)).first()

    if not roomAllocation:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Room Allocation is not completed for selected timeslot."
        )

    if roomAllocation.bookedRooms == roomAllocation.rooms:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Room not available for selected timeslot."
        )

    roomAllocation.bookedRooms += 1

    db.add(routine)
    db.commit()
    db.refresh(routine)
    db.refresh(roomAllocation)
    return routine


@router.delete("", status_code=status.HTTP_200_OK)
async def delete_routine(routine: Routine, db: Session = Depends(get_db)):
    section = db.exec(select(Section).where(
        Section.id == routine.section_id)).first()

    roomAllocation = db.exec(select(RoomAllocation).where(
        RoomAllocation.timeSlot_id == routine.timeSlot_id, section.semester_id == RoomAllocation.semester_id == section.semester_id)).first()

    if roomAllocation.bookedRooms != 0:
        roomAllocation.bookedRooms -= 1

    routine = db.exec(select(Routine).where(Routine.section_id ==
                      routine.section_id, Routine.timeSlot_id == routine.timeSlot_id)).first()

    db.delete(routine)
    db.commit()
    db.refresh(roomAllocation)
    status = "ok"
    return status
