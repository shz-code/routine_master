import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDeleteSemesterMutation } from "../../../features/semester/semesterApi";

const TableRow = ({ index, data }) => {
  const [deleteSemester] = useDeleteSemesterMutation();

  const handleDelete = async () => {
    let confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      await deleteSemester(data.id);
    }
  };

  return (
    <>
      <tr>
        <td className="py-3">{index + 1}</td>
        <td>{data.name}</td>
        <td>{data.year}</td>
        <td>{new Date(data.startDate).toDateString()}</td>
        <td>{new Date(data.endDate).toDateString()}</td>
        <td>
          <div className="flex justify-center gap-2 items-center cursor-pointer">
            <Link
              to={`/semester/edit/${data.id}`}
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

const AllRoomAllocationsTable = ({ allRequests }) => {
  return (
    <div className="overflow-x-auto mt-8">
      <table className="w-full text-center">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Semester Name</th>
            <th>Year</th>
            <th>Start Date</th>
            <th>End Date</th>
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
                No Semester Record Found
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

export default AllRoomAllocationsTable;
