from sqlmodel import SQLModel, Field

class Teacher(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True)
    name: str
    code: str = Field(unique=True)