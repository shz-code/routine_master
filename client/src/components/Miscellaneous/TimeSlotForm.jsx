import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCreateTimeSlotMutation } from "../../features/timeSlot/timeSlotApi";
import Button from "../ui/Button";
import Input from "../ui/Input";

const TimeSlotForm = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [createTimeSlot, { isLoading, isError }] = useCreateTimeSlotMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createTimeSlot({
      startTime: startTime.trim(),
      endTime: endTime.trim(),
    });
    if (res.data) {
      toast.success("TimeSlot created successfully");
      //   setStartTime("");
      //   setEndTime("");
    }
  };

  useEffect(() => {
    if (isError) toast.error("There was an error!");
  }, [isError]);

  return (
    <section className="py-8">
      <div className="container mx-auto px-2">
        <div className="p-4 border rounded bg-gray-100">
          <div>
            <h2>Add Time Slot</h2>
          </div>
          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <div className="w-full">
              <div className="w-full">
                <Input
                  label="Start Time"
                  id="startTime"
                  placeholder="Ex: 8.30"
                  type="text"
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full">
              <Input
                label="End Time"
                id="endTime"
                placeholder="Ex: 9.30"
                type="text"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div>
              <Button
                type="submit"
                disabled={!endTime || !startTime || isLoading}
                loading={isLoading}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TimeSlotForm;
