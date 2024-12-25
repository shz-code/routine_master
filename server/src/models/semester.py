from typing import Optional
from sqlmodel import Field, SQLModel


class Semester(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    year: int
    name: str
    startDate: str
    endDate: str
