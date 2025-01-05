import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAssignTeacherMutation } from "../../../features/section/sectionApi";
import { useGetTeachersQuery } from "../../../features/teacher/teacherApi";
import AppSelect from "../../ui/AppSelect";

const TableRow = ({ index, data, teachers }) => {
  const [selectedTeacher, setSelectedTeacher] = useState(
    data.teacher
      ? {
          label: `${data.teacher?.name} (${data.teacher?.shortCode})`,
          value: data.teacher?.id,
        }
      : null
  );

  const [assignTeacher, { isLoading, isError, error }] =
    useAssignTeacherMutation();

  const handleAssignTeacher = async () => {
    if (selectedTeacher) {
      const res = await assignTeacher({
        id: data.id,
        body: {
          teacher_id: data.semester.id,
        },
      });
      if (res.data) {
        toast.success("Teacher Assigned Successfully");
      }
    } else alert("No teacher selected");
  };

  return (
    <>
      <tr>
        <td className="py-3 w-10">{index + 1}</td>
        <td>{data.semester.name}</td>
        <td>{data.course.courseName}</td>
        <td>{data.course.courseCode}</td>
        <td>{data.name}</td>
        <td className="w-10">
          <div className="w-56">
            <AppSelect
              value={selectedTeacher}
              selectItems={teachers}
              handleChange={(e) => setSelectedTeacher(e)}
            />
          </div>
        </td>
        <td className="w-10">
          <div className="flex justify-center gap-2 items-center cursor-pointer">
            <span
              className="bg-gray-100 rounded p-2 hover:bg-green-100"
              onClick={handleAssignTeacher}
            >
              <Check />
            </span>
          </div>
        </td>
      </tr>
    </>
  );
};

const AssignTeacherTable = ({ allRequests }) => {
  const [teachers, setTeachers] = useState([]);
  const { data, isLoading, isError } = useGetTeachersQuery();

  useEffect(() => {
    if (!isLoading && !isError) {
      const t = data.map((d) => {
        return { label: `${d.name} (${d.shortCode})`, value: d.id };
      });
      setTeachers(t);
    }
  }, [isLoading, isError]);

  return (
    <div className="overflow-x-auto mt-8">
      <table className="w-full text-center">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Semester</th>
            <th>Course Name</th>
            <th>Course Code</th>
            <th>Section Name</th>
            <th>Teacher</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allRequests.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="bg-red-700 text-white font-semibold py-4"
              >
                No Requests Found
              </td>
            </tr>
          ) : (
            allRequests.map((a, index) => (
              <TableRow
                key={index}
                index={index}
                data={a}
                teachers={teachers}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssignTeacherTable;
