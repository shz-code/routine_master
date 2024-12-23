import { useEffect } from "react";
import toast from "react-hot-toast";

import { useGetCoursesQuery } from "../../../features/course/courseApi";
import Loader from "../../ui/Loader";
import AllCoursesTable from "./AllCoursesTable";

const AllCourses = () => {
  const { data, isLoading, isError, error } = useGetCoursesQuery(undefined, {
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
          <h2>View All Courses</h2>
        </div>
        {isLoading && (
          <div>
            <Loader />
          </div>
        )}
        {!isLoading && !isError && <AllCoursesTable allRequests={data} />}
      </div>
    </section>
  );
};

export default AllCourses;
