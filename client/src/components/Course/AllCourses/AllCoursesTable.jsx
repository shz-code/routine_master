import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDeleteCourseMutation } from "../../../features/course/courseApi";

const TableRow = ({ index, data }) => {
  const [deleteCourse] = useDeleteCourseMutation();
  const handleDelete = async () => {
    let confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      await deleteCourse(data.id);
    }
  };

  return (
    <>
      <tr>
        <td className="py-3">{index + 1}</td>
        <td>{data.courseName}</td>
        <td>{data.courseCode}</td>
        <td>{data.creditHours}</td>
        <td>
          <div className="flex justify-center gap-2 items-center cursor-pointer">
            <Link
              to={`/course/edit/${data.id}`}
              className="bg-gray-100 rounded p-2 hover:bg-yellow-100"
            >
              <Edit />
            </Link>
            <span
              className="bg-gray-100 rounded p-2 hover:bg-red-100"
              onClick={handleDelete}
            >
              <Trash2 />
            </span>
          </div>
        </td>
      </tr>
    </>
  );
};

const AllCoursesTable = ({ allRequests }) => {
  return (
    <div className="overflow-x-scroll mt-8">
      <table className="w-full text-center">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Course Name</th>
            <th>Course Code</th>
            <th>Credit Hours</th>
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
                No Courses Found
              </td>
            </tr>
          ) : (
            allRequests.map((a, index) => (
              <TableRow key={index} index={index} data={a} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllCoursesTable;
