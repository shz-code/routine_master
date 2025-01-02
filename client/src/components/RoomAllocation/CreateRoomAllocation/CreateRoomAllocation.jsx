import CreateRoomAllocationForm from "./CreateRoomAllocationForm";

const CreateRoomAllocation = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-2">
        <div className="p-4 border rounded bg-gray-100 mt-4">
          <div>
            <h2>Room Allocation</h2>
          </div>
          <CreateRoomAllocationForm />
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default CreateRoomAllocation;
