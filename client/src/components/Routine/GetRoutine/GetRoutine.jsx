import _ from "lodash";
import { useEffect, useState } from "react";
import { useGetTeacherRoutineMutation } from "../../../features/routine/routineApi";
import { useGetSemestersQuery } from "../../../features/semester/semesterApi";
import { useGetTeachersQuery } from "../../../features/teacher/teacherApi";
import { useGetTImeSlotsQuery } from "../../../features/timeSlot/timeSlotApi";
import { default as AppSelect } from "../../ui/AppSelect";
import Button from "../../ui/Button";

const days = [
  { value: 1, name: "Saturday" },
  { value: 2, name: "Sunday" },
  { value: 3, name: "Monday" },
  { value: 4, name: "Tuesday" },
  { value: 5, name: "Wednesday" },
  { value: 6, name: "Thursday" },
  { value: 7, name: "Friday" },
];

const initialRoutine = [
  {},
  { day: "Saturday", courses: [] },
  { day: "Sunday", courses: [] },
  { day: "Monday", courses: [] },
  { day: "Tuesday", courses: [] },
  { day: "Wednesday", courses: [] },
  { day: "Thursday", courses: [] },
  { day: "Friday", courses: [] },
];

const GetRoutine = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [loading, setLoading] = useState(false);

  const [teachers, setTeachers] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const {
    data: timeSlotsData,
    isLoading: timeLoading,
    isError: isTimeError,
    error,
  } = useGetTImeSlotsQuery();

  const {
    data: teachersData,
    isError: isTeacherError,
    isLoading: teachersLoading,
  } = useGetTeachersQuery(undefined, { refetchOnMountOrArgChange: true });

  const {
    data: semestersData,
    isLoading: semestersLoading,
    isError: isSemesterError,
  } = useGetSemestersQuery(undefined, { refetchOnMountOrArgChange: true });

  const [getTeacherRoutine] = useGetTeacherRoutineMutation();

  const [routine, setRoutine] = useState(initialRoutine);

  useEffect(() => {
    if (!teachersLoading && !isTeacherError) {
      const cL = [];
      teachersData.map((l) => {
        cL.push({
          value: l.id,
          label: `${l.name} (${l.shortCode})`,
        });
      });
      setTeachers(cL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teachersLoading, isTeacherError]);

  useEffect(() => {
    if (!semestersLoading && !isSemesterError) {
      const t = [];
      semestersData.map((l) => {
        t.push({
          value: l.id,
          label: `${l.name}`,
          semesterData: { ...l },
        });
      });
      setSemesters(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSemesterError, semestersLoading]);

  const getRoutine = async () => {
    setLoading(true);
    try {
      const res = await getTeacherRoutine({
        semester_id: selectedSemester.value,
        teacher_id: selectedTeacher.value,
      });

      let newRoutine = _.cloneDeep(initialRoutine);

      res.data.map((item) => {
        newRoutine[item.day_index].courses.push({
          timeSlot_id: item.timeSlot.id,
          courseCode: item.section.course.courseCode,
          courseId: item.section.course.id,
          section: `${item.section.course.courseCode} - ${item.section.name}`,
          section_id: item.section.id,
        });
      });
      setRoutine(newRoutine);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
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
                  {!teachersLoading && teachers.length > 0 && (
                    <AppSelect
                      label="Select Teacher"
                      selectItems={teachers}
                      handleChange={(e) => setSelectedTeacher(e)}
                    />
                  )}
                </div>
                <div className="w-full">
                  <div className="w-full">
                    {!semestersLoading && semesters.length > 0 && (
                      <AppSelect
                        label="Select Semester"
                        selectItems={semesters}
                        handleChange={(e) => setSelectedSemester(e)}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full print:hidden">
                <Button
                  disabled={!selectedTeacher || !selectedSemester || loading}
                  loading={loading}
                  onClick={getRoutine}
                >
                  Get Routine
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
                  timeSlotsData.length > 0 &&
                  timeSlotsData.map((t) => (
                    <th key={t.id}>
                      {t.startTime} - {t.endTime}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {days.map((d) => (
                <tr key={d.value}>
                  <td>{d.name}</td>
                  {!timeLoading &&
                    timeSlotsData.length > 0 &&
                    timeSlotsData.map((t) => (
                      <td key={t.id}>
                        {routine[d.value].courses.map(
                          (c, ind) =>
                            Number(c.timeSlot_id) === t.id && (
                              <div
                                key={ind}
                                className="flex justify-center items-center gap-4"
                              >
                                <p className="flex flex-col">
                                  <span>{c.section}</span>
                                </p>
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
        <div className="mt-8 print:hidden">
          <Button onClick={() => window.print()}>Print Routine</Button>
        </div>
      </div>
    </section>
  );
};

export default GetRoutine;
