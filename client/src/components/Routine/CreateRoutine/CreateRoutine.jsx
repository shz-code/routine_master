import _ from "lodash";
import { Delete } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useCreateRoutineMutation,
  useDeleteRoutineMutation,
  useGetTeacherRoutineMutation,
} from "../../../features/routine/routineApi";
import { useGetTeacherAssignedSectionsMutation } from "../../../features/section/sectionApi";
import { useGetSemestersQuery } from "../../../features/semester/semesterApi";
import { useGetTeachersQuery } from "../../../features/teacher/teacherApi";
import { useGetTImeSlotsQuery } from "../../../features/timeSlot/timeSlotApi";
import AppSelect from "../../ui/AppSelect";
import Button from "../../ui/Button";

const days = [
  { value: 1, label: "Saturday" },
  { value: 2, label: "Sunday" },
  { value: 3, label: "Monday" },
  { value: 4, label: "Tuesday" },
  { value: 5, label: "Wednesday" },
  { value: 6, label: "Thursday" },
  { value: 7, label: "Friday" },
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

const CreateRoutine = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const [teachers, setTeachers] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [sections, setSections] = useState([]);

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  const [times, setTimes] = useState([]);

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

  const {
    data: timeSlotsData,
    isLoading: timeLoading,
    isError: isTimeError,
    error,
  } = useGetTImeSlotsQuery();

  const [getTeacherAssignedSections] = useGetTeacherAssignedSectionsMutation();
  const [deleteRoutine] = useDeleteRoutineMutation();

  const [createRoutine, { isError: submitIsError, error: submitError }] =
    useCreateRoutineMutation();

  const [getTeacherRoutine] = useGetTeacherRoutineMutation();

  const [routine, setRoutine] = useState(initialRoutine);

  useEffect(() => {
    (async () => {
      if (selectedSemester && selectedTeacher) {
        // Get related sections
        const res = await getTeacherAssignedSections({
          semester_id: selectedSemester.value,
          teacher_id: selectedTeacher.value,
        });
        if (res.data) {
          const d = res.data.map((s) => {
            return {
              label: `${s.course.courseCode} - ${s.name}`,
              value: s.id,
              sectionData: { ...s },
            };
          });
          setSections(d);
        }
        // Get Related Routine
        const prevRoutine = await getTeacherRoutine({
          semester_id: selectedSemester.value,
          teacher_id: selectedTeacher.value,
        });
        if (prevRoutine.data?.length > 0) {
          let newRoutine = _.cloneDeep(routine);

          prevRoutine.data.map((item) => {
            newRoutine[item.day_index].courses.push({
              timeSlot_id: item.timeSlot.id,
              courseCode: item.section.course.courseCode,
              courseId: item.section.course.id,
              section: `${item.section.course.courseCode} - ${item.section.name}`,
              section_id: item.section.id,
            });
          });
          setRoutine(newRoutine);
        } else {
          setRoutine(initialRoutine);
        }
      }
    })();
  }, [selectedSemester, selectedTeacher]);

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
    if (!timeLoading && !isTimeError && timeSlotsData.length > 0) {
      const t = [];
      timeSlotsData.map((l) => {
        t.push({
          value: l.id,
          label: `${l.startTime} - ${l.endTime}`,
          timeSlotData: { ...l },
        });
      });
      setTimes(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLoading, isTimeError]);

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

  useEffect(() => {
    if (isTimeError) {
      toast.error(error.data?.detail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimeError]);

  useEffect(() => {
    if (submitIsError) toast.error(submitError.data?.detail);
  }, [submitIsError, submitError]);

  const addSchedule = async () => {
    let newRoutine = _.cloneDeep(routine);

    let ck = true;

    newRoutine[selectedDay.value].courses.map((c) => {
      if (c.timeSlot_id == selectedTime.value) {
        ck = false;
        toast.error(`Time slot already selected for ${c.courseCode}`);
      }
    });

    if (newRoutine[selectedDay.value].courses.length > 1 && ck) {
      let c = _.cloneDeep(newRoutine[selectedDay.value].courses);
      c.push({ timeSlot_id: selectedTime.value });
      c = c.sort((a, b) => Number(a.timeSlot_id) - Number(b.timeSlot_id));

      for (let i = 0; i < c.length - 2; i++) {
        if (
          Number(c[i].timeSlot_id) + 1 === Number(c[i + 1].timeSlot_id) &&
          Number(c[i + 1].timeSlot_id) + 1 === Number(c[i + 2].timeSlot_id)
        ) {
          let sure = confirm(
            "Choosing this slot makes 3 hours consecutive class for faculty. Are you sure?"
          );
          ck = sure;
        }
      }
    }

    if (ck) {
      newRoutine[selectedDay.value].courses.push({
        timeSlot_id: selectedTime.value,
        courseCode: selectedSection.sectionData.course.courseCode,
        courseId: selectedSection.sectionData.course.id,
        section: selectedSection.label,
        section_id: selectedSection.value,
      });
      try {
        const res = await createRoutine({
          timeSlot_id: selectedTime.value,
          section_id: selectedSection.value,
          day_index: selectedDay.value,
        });
        if (res.data) {
          setRoutine(newRoutine);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeSchedule = async (section_id, day, time) => {
    let newRoutine = _.cloneDeep(routine);

    const res = await deleteRoutine({
      section_id: section_id,
      timeSlot_id: time,
    });

    if (res.data) {
      newRoutine[day].courses = newRoutine[day].courses.filter(
        (c) => c.timeSlot_id != time
      );
      setRoutine(newRoutine);
    }
  };

  // Deprecated
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
                  {!teachersLoading &&
                    !isTeacherError &&
                    teachersData.length > 0 && (
                      <AppSelect
                        label="Select Teacher"
                        selectItems={teachers}
                        handleChange={(e) => setSelectedTeacher(e)}
                      />
                    )}
                </div>
                <div className="w-full">
                  {!semestersLoading &&
                    !isSemesterError &&
                    semestersData.length > 0 && (
                      <AppSelect
                        label="Select Semester"
                        selectItems={semesters}
                        handleChange={(e) => setSelectedSemester(e)}
                      />
                    )}
                </div>
              </div>
              {/* Row 2 */}
              <div className="break-on-md w-full gap-2">
                <div className="w-full">
                  <AppSelect
                    label="Select Section"
                    selectItems={sections}
                    disabled={sections.length === 0}
                    loading={sections.length === 0}
                    handleChange={(e) => setSelectedSection(e)}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* AppSelect Day and Time */}
          <div className="mt-8 bg-slate-200 p-4 rounded shadow">
            {/* Row 1 */}
            <div className="space-y-4">
              <div className="break-on-md w-full gap-2">
                <div className="w-full">
                  <AppSelect
                    label="Select Day"
                    selectItems={days}
                    value={selectedDay}
                    handleChange={(e) => setSelectedDay(e)}
                  />
                </div>
                <div className="w-full">
                  {!timeLoading && !isTimeError && times.length > 0 && (
                    <AppSelect
                      label="Select Time Slot"
                      selectItems={times}
                      value={selectedTime}
                      handleChange={(e) => setSelectedTime(e)}
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
                      // !selectedCourse ||
                      !selectedSection ||
                      !selectedTeacher ||
                      !selectedSemester
                    }
                    onClick={addSchedule}
                    type="button"
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
                    !isTimeError &&
                    times.length > 0 &&
                    times.map((t) => <th key={t.value}>{t.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {days.map((d) => (
                  <tr key={d.value}>
                    <td>{d.label}</td>
                    {!timeLoading &&
                      !isTimeError &&
                      times.length > 0 &&
                      times.map((t) => (
                        <td key={t.value}>
                          {routine[d.value].courses.map(
                            (c, ind) =>
                              Number(c.timeSlot_id) === t.value && (
                                <div
                                  key={ind}
                                  className="flex justify-center items-center gap-4"
                                >
                                  <p className="flex flex-col">
                                    <span>{c.section}</span>
                                  </p>
                                  <span
                                    className="text-red-700 p-1 bg-slate-200/60 hover:bg-slate-200 rounded cursor-pointer"
                                    onClick={() =>
                                      removeSchedule(
                                        c.section_id,
                                        d.value,
                                        t.value
                                      )
                                    }
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
        </div>
      </div>
    </section>
  );
};

export default CreateRoutine;
