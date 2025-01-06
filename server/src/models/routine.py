from typing import Optional
from sqlmodel import Field, Relationship, SQLModel

from src.models.section import Section, SectionRead
from src.models.timeSlot import TimeSlot


class Routine(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    timeSlot_id: int = Field(foreign_key="timeslot.id")
    section_id: int = Field(foreign_key="section.id")
    day_index: int  # 1 = Saturday 2 = Sunday .....

    timeSlot: Optional[TimeSlot] = Relationship()
    section: Optional[Section] = Relationship()


class TimeSlotRead(SQLModel):
    id: int
    startTime: str
    endTime: str
    altStartTime: str
    altEndTime: str


class RoutineRead(SQLModel):
    day_index: int
    timeSlot: TimeSlotRead
    section: SectionRead
