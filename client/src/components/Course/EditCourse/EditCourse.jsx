import { useParams } from "react-router-dom";
import { useGetCourseQuery } from "../../../features/course/courseApi";
import Loader from "../../ui/Loader";
import EditCourseForm from "./EditCourseForm";

const EditCourse = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetCourseQuery(id);

  return (
    <section className="py-8">
      <div className="container mx-auto px-2">
        <div className="p-4 border rounded bg-gray-100 mt-4">
          <div>
            <h2>Edit Course Information</h2>
          </div>
          {isLoading && <Loader />}
          {!isError && !isLoading && data && <EditCourseForm data={data} />}
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default EditCourse;
