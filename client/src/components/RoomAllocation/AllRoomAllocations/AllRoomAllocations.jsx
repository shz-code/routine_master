import { useEffect } from "react";
import toast from "react-hot-toast";

import { useGetRoomAllocationsQuery } from "../../../features/roomAllocation/roomAllocationApi";
import Loader from "../../ui/Loader";
import AllRoomAllocationsTable from "./AllRoomAllocationsTable";

const AllRoomAllocations = () => {
  const { data, isLoading, isError, error } = useGetRoomAllocationsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );

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
          <h2>Room Allocations</h2>
        </div>
        {isLoading && (
          <div>
            <Loader />
          </div>
        )}
        {!isLoading && !isError && (
          <AllRoomAllocationsTable allRequests={data} />
        )}
      </div>
    </section>
  );
};

export default AllRoomAllocations;
