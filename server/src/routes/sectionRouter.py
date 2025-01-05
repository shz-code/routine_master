from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import null
from sqlmodel import Session, select
from sqlalchemy.orm import joinedload
from src.lib.db import get_db
from src.models.section import Section, SectionRead

router = APIRouter()


@router.get("", response_model=list[SectionRead])
async def get_sections(db: Session = Depends(get_db)):
    sections = db.exec(
        select(Section).options()).all()
    return sections


@router.get("/{id}", response_model=SectionRead)
async def get_section(id: int, db: Session = Depends(get_db)):
    section = db.exec(select(Section).where(
        Section.id == id)).first()
    return section


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_section(sections: list[Section], db: Session = Depends(get_db)):
  # Validate if any of the sections already exist
    for section in sections:
        validity_check = db.exec(
            select(Section).where(
                (Section.semester_id == section.semester_id) &
                (Section.course_id == section.course_id) &
                (Section.name == section.name)
            )
        ).first()

        if validity_check:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Section list for this course and semester already exists."
            )

    # Perform bulk insert
    db.bulk_save_objects(sections)
    db.commit()

    # Return all inserted sections
    return sections


@router.post("/single", status_code=status.HTTP_201_CREATED)
async def create_single_section(section: Section, db: Session = Depends(get_db)):
  # Validate if any of the sections already exist
    validity_check = db.exec(
        select(Section).where(
            (Section.semester_id == section.semester_id) &
            (Section.course_id == section.course_id) &
            (Section.name == section.name.upper())
        )
    ).first()

    if validity_check:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Section already exists with selected course and semester."
        )

    db.add(section)
    db.commit()
    db.refresh(section)
    return section


@router.patch("/assign/{id}", response_model=SectionRead, status_code=status.HTTP_200_OK)
async def assign_teacher_to_section(id: int, section: Section, db: Session = Depends(get_db)):
    # Check section exists
    existing_section = db.exec(
        select(Section).where(Section.id == id)).first()

    if not existing_section:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Section not found."
        )

    # Update the section
    for key, value in section.model_dump(exclude_unset=True).items():
        setattr(existing_section, key, value)

    # Commit the changes
    db.commit()
    db.refresh(existing_section)
    return existing_section


@router.patch("/remove/{id}", response_model=SectionRead, status_code=status.HTTP_200_OK)
async def remove_teacher_from_section(id: int, db: Session = Depends(get_db)):

    # Check section exists
    existing_section = db.exec(
        select(Section).where(Section.id == id)).first()

    if not existing_section:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Section not found."
        )

    # Update the section
    existing_section.teacher_id = None

    # Commit the changes
    db.commit()
    db.refresh(existing_section)
    return existing_section


@router.patch("/{id}", response_model=SectionRead, status_code=status.HTTP_200_OK)
async def edit_section(id: int, section: Section, db: Session = Depends(get_db)):
    validityCheck = db.exec(select(Section).where(
        (Section.semester_id == section.semester_id) & (Section.course_id == section.course_id) & (Section.name == section.name) & (Section.id != id))).first()

    if validityCheck:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Section already exists with selected course and semester."
        )

    # Check if section already exists
    existing_section = db.exec(
        select(Section).where(Section.id == id)).first()

    if not existing_section:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Section not found."
        )

    # Update the section
    existing_section.name = section.name
    existing_section.studentCount = section.studentCount

    # Commit the changes
    db.commit()
    db.refresh(existing_section)
    return existing_section


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_section(id: int, db: Session = Depends(get_db)):
    section = db.exec(select(Section).where(
        Section.id == id)).first()

    if not section:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Section not found."
        )

    if section.teacher_id != None:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail="A teacher is assigned to this section. Remove teacher to delete section"
        )

    db.delete(section)
    db.commit()
    return None
