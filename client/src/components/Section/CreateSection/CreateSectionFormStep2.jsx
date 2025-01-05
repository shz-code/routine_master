import { ChevronLeft } from "lucide-react";
import Button from "../../ui/Button";

const TableRow = ({ index, data }) => {
  return (
    <>
      <tr>
        <td className="py-3">{index + 1}</td>
        <td>{data.courseName}</td>
        <td>{data.name}</td>
        <td>{data.studentCount}</td>
      </tr>
    </>
  );
};

const CreateSectionFormStep2 = ({ setStep, sections }) => {
  return (
    <div>
      <div
        className="flex items-center gap-2 cursor-pointer w-fit mb-4"
        onClick={() => setStep(1)}
      >
        <span className="px-2 py-2 rounded-full text-white bg-blue-800 ">
          <ChevronLeft />
        </span>
        <p className="font-bold">Go back</p>
      </div>
      {/* Preview Table */}
      <div className="overflow-x-auto my-4 bg-white p-4 rounded">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Course Name</th>
              <th>Section Name</th>
              <th>Student Count</th>
            </tr>
          </thead>
          <tbody>
            {sections.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="bg-red-700 text-white font-semibold py-4"
                >
                  No Requests Found
                </td>
              </tr>
            ) : (
              sections.map((a, index) => (
                <TableRow key={index} index={index} data={a} />
              ))
            )}
          </tbody>
        </table>
      </div>
      <div>
        <Button type="submit">Save</Button>
      </div>
    </div>
  );
};

export default CreateSectionFormStep2;
