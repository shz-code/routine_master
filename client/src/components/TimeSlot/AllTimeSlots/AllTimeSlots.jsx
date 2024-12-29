import { useEffect } from "react";
import toast from "react-hot-toast";

import { useGetTImeSlotsQuery } from "../../../features/timeSlot/timeSlotApi";
import Loader from "../../ui/Loader";
import AllTimeSlotsTable from "./AllTimeSlotsTable";

const AllTimeSlots = () => {
  const { data, isLoading, isError, error } = useGetTImeSlotsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.data?.detail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return (
    <section className="py-8">
      <div className="container mx-auto px-2 ">
        {/* View All Requests */}
        <div className="break-on-md justify-between md:items-center gap-4">
          <h2>View All Time Slots</h2>
        </div>
        {isLoading && (
          <div>
            <Loader />
          </div>
        )}
        {!isLoading && !isError && <AllTimeSlotsTable allRequests={data} />}
      </div>
    </section>
  );
};

export default AllTimeSlots;
