import TeacherForm from "./TeacherForm";

const CreateTeacher = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-2">
        <div className="p-4 border rounded bg-gray-100 mt-4">
          <div>
            <h2>Add Teacher Information</h2>
          </div>
          <TeacherForm />
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default CreateTeacher;
