import { useEffect } from "react";
import toast from "react-hot-toast";

import { useGetSemestersQuery } from "../../../features/semester/semesterApi";
import Loader from "../../ui/Loader";
import AllSemestersTable from "./AllSemestersTable";

const AllSemesters = () => {
  const { data, isLoading, isError, error } = useGetSemestersQuery();

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
          <h2>View All Semesters</h2>
        </div>
        {isLoading && (
          <div>
            <Loader />
          </div>
        )}
        {!isLoading && !isError && <AllSemestersTable allRequests={data} />}
      </div>
    </section>
  );
};

export default AllSemesters;
