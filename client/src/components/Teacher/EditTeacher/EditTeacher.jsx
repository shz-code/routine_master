import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetTeacherQuery } from "../../../features/teacher/teacherApi";
import EditTeacherForm from "./EditTeacherForm";

const EditTeacher = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetTeacherQuery(id);

  return (
    <section className="py-8">
      <div className="container mx-auto px-2">
        <div className="p-4 border rounded bg-gray-100 mt-4">
          <div>
            <h2>Edit Teacher Information</h2>
          </div>
          {isLoading && <Loader />}
          {!isError && !isLoading && data && <EditTeacherForm data={data} />}
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default EditTeacher;
