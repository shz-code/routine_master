from sqlmodel import SQLModel, Field


class Teacher(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True)
    name: str
    email: str
    phoneNo: str
    shortCode: str
