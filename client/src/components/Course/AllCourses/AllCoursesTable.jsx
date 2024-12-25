const TableRow = ({ index, data }) => {
  return (
    <>
      <tr>
        <td className="py-3">{index + 1}</td>
        <td>{data.courseName}</td>
        <td>{data.courseCode}</td>
        <td>{data.creditHours}</td>
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
