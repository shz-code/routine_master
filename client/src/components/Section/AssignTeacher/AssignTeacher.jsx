import { useEffect, useState } from "react";

import { useGetCoursesQuery } from "../../../features/course/courseApi";
import { useGetSectionsQuery } from "../../../features/section/sectionApi";
import { useGetSemestersQuery } from "../../../features/semester/semesterApi";
import AppSelect from "../../ui/AppSelect";
import Loader from "../../ui/Loader";
import AssignTeacherTable from "./AssignTeacherTable";

const AssignTeacher = () => {
  const { data, isLoading, isError } = useGetSectionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  const [content, setContent] = useState([]);
  const [contentLoading, setContentLoading] = useState(false);

  // Fetch semesters
  const {
    data: semesterData,
    isLoading: isSemesterLoading,
    isError: isSemesterError,
  } = useGetSemestersQuery();

  useEffect(() => {
    if (!isLoading && !isError) {
      setContent(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError]);

  useEffect(() => {
    if (!isSemesterError && !isSemesterLoading) {
      const sem = semesterData.map((s) => {
        return { label: s.name, value: s.id };
      });
      setSemesters(sem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSemesterLoading, isSemesterError]);

  // Fetch courses
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
      setCourses(ts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCourseLoading, isCourseError]);

  useEffect(() => {
    setContentLoading(true);
    if (selectedSemester || selectedCourse) {
      setContent(
        data
          .filter((d) =>
            selectedSemester ? d.semester.id === selectedSemester : true
          )
          .filter((d) =>
            selectedCourse ? d.course.id === selectedCourse : true
          )
      );
    }
    setContentLoading(false);
  }, [selectedSemester, selectedCourse]);

  return (
    <section className="py-8">
      <div className="container mx-auto px-2 ">
        <div className="filter break-on-md gap-4 mb-4">
          <div className="w-full">
            <AppSelect
              label="Filter by Semester"
              selectItems={semesters}
              handleChange={(e) => setSelectedSemester(e.value)}
            />
          </div>
          <div className="w-full">
            <AppSelect
              label="Filter by Course"
              selectItems={courses}
              handleChange={(e) => setSelectedCourse(e.value)}
            />
          </div>
        </div>
        {/* View All Requests */}
        <div className="break-on-md justify-between md:items-center gap-4">
          <h2>Assign Teacher to Section</h2>
        </div>
        {isLoading && (
          <div>
            <Loader />
          </div>
        )}
        {!isLoading && !isError && !contentLoading && (
          <AssignTeacherTable allRequests={content} />
        )}
      </div>
    </section>
  );
};

export default AssignTeacher;
