import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEditTimeSlotMutation } from "../../../features/timeSlot/timeSlotApi";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

const EditTimeSlotForm = ({ data }) => {
  const [startTime, setStartTime] = useState(data.startTime);
  const [endTime, setEndTime] = useState(data.endTime);
  const [altStartTime, setAltStartTime] = useState(data.altStartTime);
  const [altEndTime, setAltEndTime] = useState(data.altEndTime);

  const [editTimeSlot, { isLoading, isError }] = useEditTimeSlotMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await editTimeSlot({
      id: data.id,
      body: {
        startTime: startTime.trim(),
        endTime: endTime.trim(),
        altStartTime: altStartTime.trim(),
        altEndTime: altEndTime.trim(),
      },
    });
    if (res.data) {
      toast.success("TimeSlot updated successfully");
      setTimeout(() => {
        navigate("/timeSlot/all");
      }, 1000);
    }
  };

  useEffect(() => {
    if (isError) toast.error("There was an error!");
  }, [isError]);

  return (
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
      <div className="w-full">
        <Input
          label="Ramadan Start Time"
          id="altStartTime"
          placeholder="Ex: 8.30"
          type="text"
          required
          value={altStartTime}
          onChange={(e) => setAltStartTime(e.target.value)}
        />
      </div>
      <div className="w-full">
        <Input
          label="Ramadan End Time"
          id="altEndTime"
          placeholder="Ex: 9.20"
          type="text"
          required
          value={altEndTime}
          onChange={(e) => setAltEndTime(e.target.value)}
        />
      </div>
      <div>
        <Button
          type="submit"
          disabled={!endTime || !startTime || isLoading}
          loading={isLoading}
        >
          Update
        </Button>
      </div>
    </form>
  );
};

export default EditTimeSlotForm;
