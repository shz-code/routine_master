import { Edit, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDeleteSectionMutation } from "../../../features/section/sectionApi";

const TableRow = ({ index, data }) => {
  const [deleteSection, { isError, error }] = useDeleteSectionMutation();

  const handleDelete = async () => {
    let confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      await deleteSection(data.id);
    }
  };

  useEffect(() => {
    if (isError) toast.error(error.data?.detail);
  }, [isError]);
  return (
    <>
      <tr>
        <td className="py-3">{index + 1}</td>
        <td>{data.semester.name}</td>
        <td>{data.course.courseName}</td>
        <td>{data.course.courseCode}</td>
        <td>{data.name}</td>
        <td>{data.studentCount}</td>
        <td>
          <div className="flex justify-center gap-2 items-center cursor-pointer">
            <Link
              to={`/section/edit/${data.id}`}
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

const AllSectionsTable = ({ allRequests }) => {
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
            <th>Student Count</th>
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
              <TableRow key={index} index={index} data={a} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllSectionsTable;
