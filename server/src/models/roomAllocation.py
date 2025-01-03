from sqlmodel import SQLModel
from typing import Optional
from sqlmodel import Relationship, SQLModel, Field

from src.models.timeSlot import TimeSlot
from src.models.semester import Semester


class RoomAllocation(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    rooms: int
    bookedRooms: Optional[int] = Field(default=0)
    timeSlot_id: int = Field(foreign_key='timeslot.id')
    semester_id: int = Field(foreign_key='semester.id')

    semester: Optional[Semester] = Relationship()
    timeSlot: Optional[TimeSlot] = Relationship()


# Response model


class SemesterRead(SQLModel):
    id: int
    name: str
    startDate: str
    endDate: str
    year: int


class TimeSlotRead(SQLModel):
    id: int
    startTime: str
    endTime: str
    altStartTime: str
    altEndTime: str


class RoomAllocationRead(SQLModel):
    id: int
    rooms: int
    bookedRooms: int
    timeSlot: TimeSlotRead
    semester: SemesterRead
