import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEditSectionMutation } from "../../../features/section/sectionApi";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

const EditSectionForm = ({ data }) => {
  const [sectionName, setSectionName] = useState(data.name);
  const [studentCount, setStudentCount] = useState(data.studentCount);

  const [editSection, { isLoading, isError, error }] = useEditSectionMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await editSection({
      id: data.id,
      body: {
        name: sectionName,
        semester_id: data.semester.id,
        course_id: data.course.id,
        studentCount,
      },
    });
    if (res.data) {
      toast.success("Section updated successfully");
      setTimeout(() => {
        navigate("/section/all");
      }, 1000);
    }
  };

  useEffect(() => {
    if (isError) toast.error(error.data?.detail);
  }, [isError]);

  return (
    <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
      <div className="w-full">
        <div className="w-full">
          <Input
            label="Section Name"
            id="sectionName"
            placeholder="Ex: A"
            type="text"
            required
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full">
        <Input
          label="Section Capacity"
          id="studentCount"
          placeholder="Ex: 9.30"
          type="text"
          required
          value={studentCount}
          onChange={(e) => setStudentCount(e.target.value)}
        />
      </div>
      <div className="flex gap-4 items-center">
        <h3>Course:</h3>
        <p>
          {data.course.courseName} ({data.course.courseCode})
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <h3>Class Time:</h3>
        <p>
          {data.timeSlot
            ? `${data.timeSlot.startTime} - ${data.timeSlot.endTime}`
            : "Not Assigned"}
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <h3>Assigned Teacher:</h3>
        <p>
          {data.teacher
            ? `${data.teacher.name} (${data.teacher.shortCode})`
            : "Not Assigned"}
        </p>
      </div>
      <div>
        <Button
          type="submit"
          disabled={!sectionName || !studentCount || isLoading}
          loading={isLoading}
        >
          Update
        </Button>
      </div>
    </form>
  );
};

export default EditSectionForm;
