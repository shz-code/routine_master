const TableRow = ({ index, data }) => {
  return (
    <>
      <tr>
        <td className="py-3">{index + 1}</td>
        <td>{data.name}</td>
        <td>{data.year}</td>
        <td>{new Date(data.startDate).toDateString()}</td>
        <td>{new Date(data.endDate).toDateString()}</td>
      </tr>
    </>
  );
};

const AllSemestersTable = ({ allRequests }) => {
  return (
    <div className="overflow-x-scroll mt-8">
      <table className="w-full text-center">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Semester Name</th>
            <th>Year</th>
            <th>Start Date</th>
            <th>End Date</th>
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

export default AllSemestersTable;
