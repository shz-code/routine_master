from typing import Optional
from sqlmodel import Field, SQLModel


class TimeSlot(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    startTime: str
    endTime: str
    altStartTime: str
    altEndTime: str
