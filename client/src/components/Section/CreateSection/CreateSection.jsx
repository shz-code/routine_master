import CreateSectionForm from "./CreateSectionForm";

const CreateSection = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-2">
        <div className="p-4 border rounded bg-gray-100 mt-4">
          <div>
            <h2>Generate Section for a Semester</h2>
          </div>
          <CreateSectionForm />
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default CreateSection;
