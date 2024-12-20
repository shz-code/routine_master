import SemesterCreateForm from "./SemesterCreateForm";

const CreateSemester = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-2">
        <div className="p-4 border rounded bg-gray-100 mt-4">
          <div>
            <h2>Add Semester Information</h2>
          </div>
          <SemesterCreateForm />
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default CreateSemester;
