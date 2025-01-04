import _ from "lodash";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { generateSectionName } from "../../../../lib/generateSectionName";
import { useGetCoursesQuery } from "../../../features/course/courseApi";
import {
  useCreateSectionsMutation,
  useCreateSingleSectionMutation,
} from "../../../features/section/sectionApi";
import { useGetSemestersQuery } from "../../../features/semester/semesterApi";
import AppSelect from "../../ui/AppSelect";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import CreateSectionFormStep2 from "./CreateSectionFormStep2";

const CreateSectionForm = () => {
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [course, setCourse] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  const [totalStudents, setTotalStudents] = useState(0);
  const [studentsPerSection, setStudentsPerSection] = useState(0);
  const [singleSection, setSingleSection] = useState(false);

  const [sections, setSections] = useState([]);
  const [sectionName, setSectionName] = useState("");
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  // Fetch semesters
  const {
    data: semesterData,
    isLoading: isSemesterLoading,
    isError: isSemesterError,
  } = useGetSemestersQuery();

  useEffect(() => {
    if (!isSemesterError && !isSemesterLoading) {
      const sem = semesterData.map((s) => {
        return { label: s.name, value: s.id };
      });
      setSemesters(sem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSemesterLoading, isSemesterError]);

  // Fetch course
  const {
    data: courseData,
    isLoading: isCourseLoading,
    isError: isCourseError,
  } = useGetCoursesQuery();

  useEffect(() => {
    if (!isCourseError && !isCourseLoading) {
      const ts = courseData.map((c) => {
        return { label: `${c.courseName} (${c.courseCode})`, value: c.id };
      });

      setCourse(ts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCourseLoading, isCourseError]);

  // Create API
  const [createSection, { isLoading, isError, error }] =
    useCreateSectionsMutation();

  const [createSingleSection, { isError: isSingleError, error: singleError }] =
    useCreateSingleSectionMutation();

  useEffect(() => {
    if (isSingleError) {
      toast.error(singleError.data?.detail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSingleError, singleError]);

  useEffect(() => {
    if (isError) {
      toast.error(error.data?.detail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  const generateSections = () => {
    const totalSections = Math.ceil(totalStudents / studentsPerSection);
    const s = [];

    for (let i = 0; i < totalSections; i++) {
      const name = generateSectionName(i); // Generate section name dynamically
      const count =
        i === totalSections - 1 && totalStudents % studentsPerSection !== 0
          ? totalStudents % studentsPerSection
          : studentsPerSection;

      s.push({
        id: i + 1,
        semester_id: selectedSemester.value,
        course_id: selectedCourse.value,
        courseName: selectedCourse.label,
        name,
        studentCount: Number(count),
      });
    }
    setSections(s);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqData = sections.map((s) => {
      return _.pick(s, ["name", "studentCount", "course_id", "semester_id"]);
    });
    let res = {};

    if (singleSection) {
      res = await createSingleSection({
        name: sectionName,
        studentCount: studentsPerSection,
        course_id: selectedCourse.value,
        semester_id: selectedSemester.value,
      });
    } else {
      res = await createSection(reqData);
    }
    if (res.data) {
      toast.success("Section list generated successfully");
      setTimeout(() => {
        // navigate("/roomAllocation/all");
      }, 1000);
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      {step === 1 ? (
        <div className="space-y-4">
          <div className="w-full">
            <AppSelect
              label="Select Semester"
              required
              value={selectedSemester}
              selectItems={semesters}
              handleChange={(e) => setSelectedSemester(e)}
            />
          </div>
          <div className="w-full">
            <AppSelect
              label="Select Course"
              required
              value={selectedCourse}
              selectItems={course}
              handleChange={(e) => setSelectedCourse(e)}
            />
          </div>
          {!singleSection ? (
            <div className="w-full">
              <Input
                label="Total Students"
                id="totalStudents"
                type="number"
                required
                min={0}
                value={totalStudents}
                onChange={(e) => setTotalStudents(e.target.value)}
              />
            </div>
          ) : (
            <Input
              label="Section Name"
              id="sectionName"
              type="text"
              placeholder="Enter Section Name"
              required
              min={0}
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
            />
          )}
          <div className="w-full">
            <Input
              label={singleSection ? "Student Count" : "Students Per Section"}
              id="studentsPerSection"
              type="number"
              required
              min={0}
              value={studentsPerSection}
              onChange={(e) => setStudentsPerSection(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              id="ckBox"
              className="w-4 h-4"
              onChange={(e) => setSingleSection(e.target.checked)}
            />
            <label htmlFor="ckBox">Create a single section only</label>
          </div>
          <div>
            <Button
              disabled={
                !selectedCourse |
                !selectedSemester |
                (singleSection ? false : !totalStudents) |
                (singleSection ? !sectionName : false) |
                !studentsPerSection
              }
              type={singleSection ? "submit" : "button"}
              onClick={() => {
                if (singleSection) {
                  return;
                }
                setStep(2);
                generateSections();
              }}
            >
              {singleSection ? "Generate Section" : "Next"}
            </Button>
          </div>
        </div>
      ) : (
        <CreateSectionFormStep2 setStep={setStep} sections={sections} />
      )}
    </form>
  );
};

export default CreateSectionForm;
