import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useAddCourseMutation,
  useGetCoursesQuery,
} from "../../../features/course/courseApi";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/Select";

const CourseForm = () => {
  const [courses, setCourses] = useState([]);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [credit, setCredit] = useState("");
  const [hasPrerequisite, setHasPrerequisite] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const {
    data: loadedCourses,
    isLoading: coursesLoading,
    isError: courseError,
  } = useGetCoursesQuery();

  const [addCourse, { isLoading, isError, error }] = useAddCourseMutation();

  useEffect(() => {
    if (!coursesLoading && !courseError && loadedCourses.length > 0) {
      const cL = [];
      loadedCourses.map((l) => {
        cL.push({
          value: l.courseCode,
          label: l.courseCode,
        });
      });
      setCourses(cL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coursesLoading, courseError]);

  const handleSelectCourse = (e) => {
    loadedCourses.map((l) => {
      if (e.target.value === l.courseCode) {
        setSelectedCourse(l);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addCourse({
      courseName: name,
      courseCode: code,
      creditHours: credit,
      hasPrerequisite: hasPrerequisite,
      prerequisiteId: selectedCourse ? selectedCourse.id : null,
    });
    if (res.data) {
      toast.success("Course created successfully");
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(error.data ? error.data : error.status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="w-full">
        <Input
          label="Course Name"
          id="course_name"
          placeholder="Enter Course Name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="w-full">
        <Input
          label="Course Code"
          id="code"
          placeholder="Enter Course Code"
          type="text"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div className="w-full">
        <Input
          label="Credit Hours"
          id="credit"
          placeholder="Enter Course Credit Hours"
          type="number"
          required
          max={4}
          min={0}
          value={credit}
          onChange={(e) => setCredit(e.target.value)}
        />
      </div>
      <div className="w-full">
        <label className="flex gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={hasPrerequisite}
            onChange={() => {
              setHasPrerequisite((prev) => !prev);
            }}
          />
          Course has prerequisite?
        </label>
      </div>

      <div className="w-full">
        {!coursesLoading && !courseError && courses.length > 0 && (
          <Select
            label="Select Prerequisite Course"
            selectItems={courses}
            onChange={(e) => handleSelectCourse(e)}
            disabled={!hasPrerequisite}
          />
        )}
      </div>

      <div>
        <Button
          type="submit"
          disabled={!name || !code || !credit || isLoading}
          loading={isLoading}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CourseForm;
