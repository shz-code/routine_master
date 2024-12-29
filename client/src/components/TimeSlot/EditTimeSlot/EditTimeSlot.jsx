import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetTimeSlotQuery } from "../../../features/timeSlot/timeSlotApi";
import EditTimeSlotForm from "./EditTimeSlotForm";

const EditTimeSlot = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetTimeSlotQuery(id);

  return (
    <section className="py-8">
      <div className="container mx-auto px-2">
        <div className="p-4 border rounded bg-gray-100 mt-4">
          <div>
            <h2>Edit Time Slot</h2>
          </div>
          {isLoading && <Loader />}
          {!isError && !isLoading && data && <EditTimeSlotForm data={data} />}
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default EditTimeSlot;
