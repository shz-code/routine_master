import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEditRoomAllocationMutation } from "../../../features/roomAllocation/roomAllocationApi";
import { useGetSemestersQuery } from "../../../features/semester/semesterApi";
import { useGetTImeSlotsQuery } from "../../../features/timeSlot/timeSlotApi";
import AppSelect from "../../ui/AppSelect";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

const EditRoomAllocationForm = ({ data }) => {
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(data.semester.id);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(data.timeSlot.id);
  const [rooms, setRooms] = useState(data.rooms);

  const navigate = useNavigate();

  const [editRoomAllocation, { isLoading, isError, error }] =
    useEditRoomAllocationMutation();

  // Fetch semesters
  const {
    data: semesterData,
    isLoading: isSemesterLoading,
    isError: isSemesterError,
  } = useGetSemestersQuery();

  useEffect(() => {
    if (!isSemesterError && !isSemesterLoading) {
      const sem = semesterData.map((s) => {
        return { label: s.name, value: s.id };
      });
      setSemesters(sem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSemesterLoading, isSemesterError]);

  // Fetch timeSlots
  const {
    data: timeSlotData,
    isLoading: isTimeSlotLoading,
    isError: isTimeSlotError,
  } = useGetTImeSlotsQuery();

  useEffect(() => {
    if (!isTimeSlotError && !isTimeSlotLoading) {
      const ts = timeSlotData.map((s) => {
        return { label: `${s.startTime} - ${s.endTime}`, value: s.id };
      });

      setTimeSlots(ts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimeSlotLoading, isTimeSlotError]);

  useEffect(() => {
    if (isError) {
      // toast.error(error.data?.detail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await editRoomAllocation({
      id: data.id,
      body: {
        timeSlot_id: selectedTimeSlot,
        semester_id: selectedSemester,
        rooms: rooms,
      },
    });
    if (res.data) {
      toast.success("Room Allocation updated successfully");
      setTimeout(() => {
        navigate("/roomAllocation/all");
      }, 1000);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <AppSelect
          label="Select Semester"
          required
          value={{ label: data.semester.name, value: data.semester.id }}
          selectItems={semesters}
          handleChange={(e) => setSelectedSemester(e.value)}
        />
      </div>
      <div>
        <AppSelect
          label="Select Time Slot"
          required
          value={{
            label: `${data.timeSlot.startTime} - ${data.timeSlot.endTime}`,
            value: data.timeSlot.id,
          }}
          selectItems={timeSlots}
          handleChange={(e) => setSelectedTimeSlot(e.value)}
        />
      </div>
      <div className="w-full">
        <Input
          label="Total Rooms"
          id="totalStudents"
          type="number"
          required
          min={0}
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
        />
      </div>

      <div>
        <Button
          type="submit"
          disabled={!rooms | isLoading | !selectedSemester | !selectedTimeSlot}
          loading={isLoading}
        >
          Update
        </Button>
      </div>
    </form>
  );
};

export default EditRoomAllocationForm;
