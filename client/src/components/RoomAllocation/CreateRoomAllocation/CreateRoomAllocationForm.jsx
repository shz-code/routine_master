import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreateSemestersMutation } from "../../../features/semester/semesterApi";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
// import Select from "../../ui/Select";
import AppSelect from "../../ui/AppSelect";

const CreateRoomAllocationForm = () => {
  const [semesterName, setSemesterName] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

  const [createSemesters, { isLoading, isError, error }] =
    useCreateSemestersMutation();

  useEffect(() => {
    if (semester != "" && year != "") {
      setSemesterName(`${semester} ${year}`);
    }
  }, [semester, year]);

  useEffect(() => {
    if (isError) {
      toast.error(error.data?.detail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (endDate < startDate) {
      toast.error("Semester end date cannot be before start date");
    }
    const res = await createSemesters({
      year: year,
      name: semesterName,
      startDate: startDate,
      endDate: endDate,
    });
    if (res.data) {
      toast.success("Semester created successfully");
      setTimeout(() => {
        navigate("/semester/all");
      }, 1000);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="w-full"></div>
      <div className="w-full">
        <Input
          label="Semester Name"
          id="semesterName"
          placeholder="Enter Semester Name. Ex: Summer 2024"
          type="text"
          required
          value={semesterName}
          disabled
          onChange={(e) => setSemesterName(e.target.value)}
        />
      </div>
      <div className="w-full">
        <Input
          label="Year"
          id="year"
          placeholder="Enter Year"
          type="number"
          required
          value={year}
          min={2024}
          max={2026}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div>
        <AppSelect
          label="Select Semester"
          required
          selectItems={[
            { value: "Spring", label: "Spring" },
            { value: "Summer", label: "Summer" },
            { value: "Fall", label: "Fall" },
          ]}
          value={semester}
          handleChange={(e) => setSemester(e.value)}
        />
      </div>
      <div className="w-full">
        <Input
          label="Start Date"
          id="startDate"
          type="date"
          required
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="w-full">
        <Input
          label="End Date"
          id="endDate"
          placeholder="Enter Teacher Phone Number"
          type="date"
          required
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div>
        <Button
          type="submit"
          disabled={!semesterName || !year || !startDate || !endDate}
          loading={isLoading}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CreateRoomAllocationForm;
