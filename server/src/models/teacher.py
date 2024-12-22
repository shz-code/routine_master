from sqlmodel import SQLModel, Field


class Teacher(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True)
    name: str
    email: str = Field(unique=True)
    phoneNo: str = Field(unique=True)
    shortCode: str = Field(unique=True)
