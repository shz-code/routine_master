import TimeSlotForm from "./TimeSlotForm";

const CreateTimeSlot = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-2">
        <div className="p-4 border rounded bg-gray-100 mt-4">
          <div>
            <h2>Add Time Slot</h2>
          </div>
          <TimeSlotForm />
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default CreateTimeSlot;
