from typing import Optional
from sqlmodel import Field, SQLModel


class Course(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    courseName: str
    courseCode: str
    creditHours: int
