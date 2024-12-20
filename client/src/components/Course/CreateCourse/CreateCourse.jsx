import CourseForm from "./CourseForm";

const CreateTeacher = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-2">
        <div className="p-4 border rounded bg-gray-100 mt-4">
          <div>
            <h2>Add Course Information</h2>
          </div>
          <CourseForm />
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default CreateTeacher;
