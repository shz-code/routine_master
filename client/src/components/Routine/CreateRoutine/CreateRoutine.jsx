import _ from "lodash";
import { Delete } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetCoursesQuery } from "../../../features/course/courseApi";
import { useCreateRoutineMutation } from "../../../features/routine/routineApi";
import { useGetSemestersQuery } from "../../../features/semester/semesterApi";
import { useGetTeachersQuery } from "../../../features/teacher/teacherApi";
import { useGetTImeSlotsQuery } from "../../../features/timeSlot/timeSlotApi";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/Select";

const days = [
  { id: 1, name: "Saturday" },
  { id: 2, name: "Sunday" },
  { id: 3, name: "Monday" },
  { id: 4, name: "Tuesday" },
  { id: 5, name: "Wednesday" },
  { id: 6, name: "Thursday" },
  { id: 7, name: "Friday" },
];

const CreateRoutine = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [section, setSection] = useState("");

  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [formSubmitAble, setFormSubmitAble] = useState(false);

  const {
    data: times,
    isLoading: timeLoading,
    isError,
    error,
  } = useGetTImeSlotsQuery();
  const { data: teachers, isLoading: teachersLoading } = useGetTeachersQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );
  const { data: semesters, isLoading: semestersLoading } = useGetSemestersQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );

  const [
    createRoutine,
    { isLoading, isError: submitIsError, error: submitError },
  ] = useCreateRoutineMutation();

  const {
    data: loadedCourses,
    isLoading: coursesLoading,
    isError: courseError,
  } = useGetCoursesQuery(undefined, { refetchOnMountOrArgChange: true });

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

  const [routine, setRoutine] = useState([
    {},
    { day: "Saturday", courses: [] },
    { day: "Sunday", courses: [] },
    { day: "Monday", courses: [] },
    { day: "Tuesday", courses: [] },
    { day: "Wednesday", courses: [] },
    { day: "Thursday", courses: [] },
    { day: "Friday", courses: [] },
  ]);

  useEffect(() => {
    if (isError) {
      toast.error(error.data ? error.data : error.status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  useEffect(() => {
    if (submitIsError) toast.error(submitError.data);
  }, [submitIsError, submitError]);

  const handleSelectCourse = (e) => {
    loadedCourses.map((l) => {
      if (e.target.value === l.courseCode) {
        setSelectedCourse(l);
      }
    });
  };

  const handleSemesterChange = (e) => {
    semesters.map((l) => {
      if (e.target.value === l.id) {
        setSelectedSemester(l);
      }
    });
  };

  const handleTeacherChange = (e) => {
    teachers.map((l) => {
      if (e.target.value === l.id) {
        setSelectedTeacher(l);
      }
    });
  };

  const addSchedule = () => {
    let newRoutine = _.cloneDeep(routine);

    let ck = true;

    newRoutine[selectedDay].courses.map((c) => {
      if (c.timeId == selectedTime) {
        ck = false;
        toast.error(`Time slot already selected for ${c.courseCode}`);
      }
    });

    if (newRoutine[selectedDay].courses.length > 1 && ck) {
      let c = _.cloneDeep(newRoutine[selectedDay].courses);
      c.push({ timeId: selectedTime });
      c = c.sort((a, b) => Number(a.timeId) - Number(b.timeId));

      for (let i = 0; i < c.length - 2; i++) {
        if (
          Number(c[i].timeId) + 1 === Number(c[i + 1].timeId) &&
          Number(c[i + 1].timeId) + 1 === Number(c[i + 2].timeId)
        ) {
          let sure = confirm(
            "Choosing this slot makes 3 hours consecutive class for faculty. Are you sure?"
          );
          ck = sure;
        }
      }
    }

    if (ck) {
      newRoutine[selectedDay].courses.push({
        timeId: selectedTime,
        courseCode: selectedCourse.courseCode,
        courseId: selectedCourse.id,
        section: section,
      });
      setSection("");
      setSelectedTime("");
      setRoutine(newRoutine);
      setFormSubmitAble(true);
    }
  };

  const removeSchedule = (day, time) => {
    let newRoutine = _.cloneDeep(routine);

    newRoutine[day].courses = newRoutine[day].courses.filter(
      (c) => c.timeId != time
    );

    setRoutine(newRoutine);
  };

  const handleSubmit = async () => {
    const res = await createRoutine({
      teacherId: selectedTeacher.id,
      semesterId: selectedSemester.id,
      routine: routine.slice(1),
    });
    if (res.data) {
      toast.success("Routine created successfully");
      setRoutine([
        {},
        { day: "Saturday", courses: [] },
        { day: "Sunday", courses: [] },
        { day: "Monday", courses: [] },
        { day: "Tuesday", courses: [] },
        { day: "Wednesday", courses: [] },
        { day: "Thursday", courses: [] },
        { day: "Friday", courses: [] },
      ]);
    }
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-2">
        <div className="p-4 border rounded bg-gray-100">
          {/* All Select Fields */}
          <div>
            <div className="space-y-4">
              {/* Row 1 */}
              <div className="break-on-md w-full gap-2">
                <div className="w-full">
                  {!teachersLoading && !isError && teachers.length > 0 && (
                    <Select
                      label="Select Teacher"
                      selectItems={teachers}
                      value={selectedTeacher.id}
                      onChange={(e) => handleTeacherChange(e)}
                    />
                  )}
                </div>
                <div className="w-full">
                  {!coursesLoading && !isError && courses.length > 0 && (
                    <Select
                      label="Select Course"
                      selectItems={courses}
                      onChange={(e) => handleSelectCourse(e)}
                    />
                  )}
                </div>
              </div>
              {/* Row 2 */}
              <div className="break-on-md w-full gap-2">
                <div className="w-full">
                  {!semestersLoading && !isError && semesters.length > 0 && (
                    <Select
                      label="Select Semester"
                      selectItems={semesters}
                      value={selectedSemester.id}
                      onChange={(e) => handleSemesterChange(e)}
                    />
                  )}
                </div>
                <div className="w-full">
                  <Input
                    label="Section"
                    value={section}
                    onChange={(e) => setSection(e.target.value.toUpperCase())}
                    // disabled
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Select Day and Time */}
          <div className="mt-8 bg-slate-200 p-4 rounded shadow">
            {/* Row 1 */}
            <div className="space-y-4">
              <div className="break-on-md w-full gap-2">
                <div className="w-full">
                  <Select
                    label="Select Day"
                    selectItems={days}
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  {!timeLoading && !isError && times.length > 0 && (
                    <Select
                      label="Select Time"
                      selectItems={times}
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    />
                  )}
                </div>
              </div>
              <div>
                <div className="w-full">
                  <Button
                    disabled={
                      !selectedDay ||
                      !selectedTime ||
                      !selectedCourse ||
                      !section ||
                      !selectedTeacher ||
                      !selectedSemester
                    }
                    onClick={addSchedule}
                  >
                    Add To Routine
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Routine Structure */}
          <div className="mt-8">
            <h2>Routine</h2>
          </div>
          <div className="overflow-x-scroll mt-4">
            <table className="w-full text-center">
              <thead>
                <tr>
                  <th>Day</th>
                  {!timeLoading &&
                    !isError &&
                    times.length > 0 &&
                    times.map((t) => <th key={t.id}>{t.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {days.map((d) => (
                  <tr key={d.id}>
                    <td>{d.name}</td>
                    {!timeLoading &&
                      !isError &&
                      times.length > 0 &&
                      times.map((t) => (
                        <td key={t.id}>
                          {routine[d.id].courses.map(
                            (c, ind) =>
                              Number(c.timeId) === t.id && (
                                <div
                                  key={ind}
                                  className="flex justify-center items-center gap-4"
                                >
                                  <p className="flex flex-col">
                                    {c.courseCode}
                                    <span>Sec: {c.section}</span>
                                  </p>
                                  <span
                                    className="text-red-700 p-1 bg-slate-200/60 hover:bg-slate-200 rounded cursor-pointer"
                                    onClick={() => removeSchedule(d.id, t.id)}
                                  >
                                    <Delete size={20} />
                                  </span>
                                </div>
                              )
                          )}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <Button
              disabled={isLoading || !formSubmitAble}
              loading={isLoading}
              onClick={handleSubmit}
            >
              Save Routine
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateRoutine;
