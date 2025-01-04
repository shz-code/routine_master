from sqlmodel import SQLModel
from typing import Optional
from sqlmodel import Relationship, SQLModel, Field


from src.models.teacher import Teacher
from src.models.timeSlot import TimeSlot
from src.models.course import Course
from src.models.semester import Semester


class Section(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    name: str
    studentCount: int
    semester_id: int = Field(foreign_key='semester.id')
    course_id: int = Field(foreign_key='course.id')
    timeSlot_id: Optional[int] = Field(default=None, foreign_key='timeslot.id')
    teacher_id: Optional[int] = Field(default=None, foreign_key='teacher.id')

    semester: Optional[Semester] = Relationship()
    course: Optional[Course] = Relationship()
    timeSlot: Optional[TimeSlot] = Relationship()
    teacher: Optional[Teacher] = Relationship()


# Response model


class SemesterRead(SQLModel):
    id: int
    name: str
    startDate: str
    endDate: str
    year: int


class CourseRead(SQLModel):
    id: int
    courseName: str
    courseCode: str
    creditHours: int


class TimeSlotRead(SQLModel):
    id: int
    startTime: str
    endTime: str
    altStartTime: str
    altEndTime: str


class TeacherRead(SQLModel):
    id: int
    name: str
    email: str
    phoneNo: str
    shortCode: str


class SectionRead(SQLModel):
    id: int
    name: str
    studentCount: int
    semester: SemesterRead
    course: CourseRead
    timeSlot: Optional[TimeSlotRead]
    teacher: Optional[TeacherRead]
