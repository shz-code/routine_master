import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetSemestersQuery } from "../../../features/semester/semesterApi";
import { useGetTeachersQuery } from "../../../features/teacher/teacherApi";
import { useGetTImeSlotsQuery } from "../../../features/timeSlot/timeSlotApi";
import Button from "../../ui/Button";
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

const GetRoutine = () => {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [loading, setLoading] = useState(false);

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

  const getRoutine = async () => {
    setLoading(true);
    try {
      let res = await fetch(`${import.meta.env.VITE_API_URL}/GetRoutine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teacherId: selectedTeacher.id,
          semesterId: selectedSemester.id,
        }),
      });
      res = await res.json();

      let newRoutine = [
        {},
        { day: "Saturday", courses: [] },
        { day: "Sunday", courses: [] },
        { day: "Monday", courses: [] },
        { day: "Tuesday", courses: [] },
        { day: "Wednesday", courses: [] },
        { day: "Thursday", courses: [] },
        { day: "Friday", courses: [] },
      ];

      newRoutine.map((n) => {
        res.map((r) => {
          r.RoutineSchedule.map((s) => {
            if (s.Day === n.day) {
              n.courses.push({
                timeId: s.TimeSlotId,
                courseCode: s.Course.CourseCode,
                section: s.Section,
              });
            }
          });
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
