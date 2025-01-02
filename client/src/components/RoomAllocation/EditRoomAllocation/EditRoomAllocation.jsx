import { useParams } from "react-router-dom";
import { useGetSemesterQuery } from "../../../features/semester/semesterApi";
import Loader from "../../ui/Loader";
import EditRoomAllocationForm from "./EditRoomAllocationForm";

const EditRoomAllocation = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetSemesterQuery(id);

  return (
    <section className="py-8">
      <div className="container mx-auto px-2">
        <div className="p-4 border rounded bg-gray-100 mt-4">
          <div>
            <h2>Edit Semester Information</h2>
          </div>
          {isLoading && <Loader />}
          {!isError && !isLoading && data && (
            <EditRoomAllocationForm data={data} />
          )}
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default EditRoomAllocation;
