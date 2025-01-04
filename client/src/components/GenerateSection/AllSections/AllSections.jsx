import { useEffect, useState } from "react";
import { useGetCoursesQuery } from "../../../features/course/courseApi";
import { useGetSectionsQuery } from "../../../features/section/sectionApi";
import { useGetSemestersQuery } from "../../../features/semester/semesterApi";
import AppSelect from "../../ui/AppSelect";
import Loader from "../../ui/Loader";
import AllSectionsTable from "../AllSections/AllSectionsTable";

const AllSections = () => {
  const { data, isLoading, isError } = useGetSectionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

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

  let content = data;
  if (selectedSemester || selectedCourse) {
    content = data
      .filter((d) =>
        selectedSemester ? d.semester.id === selectedSemester : true
      )
      .filter((d) => (selectedCourse ? d.course.id === selectedCourse : true));
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-2">
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
          <h2>View All Sections</h2>
        </div>
        {isLoading && (
          <div>
            <Loader />
          </div>
        )}
        {!isLoading && !isError && <AllSectionsTable allRequests={content} />}
      </div>
    </section>
  );
};

export default AllSections;
