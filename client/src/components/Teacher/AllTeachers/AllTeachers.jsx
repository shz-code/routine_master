import { useEffect } from "react";
import toast from "react-hot-toast";

import { useGetTeachersQuery } from "../../../features/teacher/teacherApi";
import Loader from "../../ui/Loader";
import AllTeachersTable from "./AllTeachersTable";

const AllTeachers = () => {
  const { data, isLoading, isError, error } = useGetTeachersQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error.data ? error.data : error.status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return (
    <section className="py-8">
      <div className="container mx-auto px-2 ">
        {/* View All Requests */}
        <div className="break-on-md justify-between md:items-center gap-4">
          <h2>View All Teachers</h2>
        </div>
        {isLoading && (
          <div>
            <Loader />
          </div>
        )}
        {!isLoading && !isError && <AllTeachersTable allRequests={data} />}
      </div>
    </section>
  );
};

export default AllTeachers;
