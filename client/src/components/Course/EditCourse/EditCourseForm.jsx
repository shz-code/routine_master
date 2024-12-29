import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEditCourseMutation } from "../../../features/course/courseApi";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

const EditCourseForm = ({ data }) => {
  const [name, setName] = useState(data.courseName);
  const [code, setCode] = useState(data.courseCode);
  const [credit, setCredit] = useState(data.creditHours);

  const [editCourse, { isLoading, isError, error }] = useEditCourseMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await editCourse({
      id: data.id,
      body: {
        courseName: name,
        courseCode: code,
        creditHours: credit,
      },
    });

    if (res.data) {
      toast.success("Course updated successfully");
      setTimeout(() => {
        navigate("/course/all");
      }, 1000);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(error.data?.detail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === "text/csv") {
      setFile(uploadedFile);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="w-full">
        <Input
          label="Course Name"
          id="course_name"
          placeholder="Enter Course Name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="w-full">
        <Input
          label="Course Code"
          id="code"
          placeholder="Enter Course Code"
          type="text"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div className="w-full">
        <Input
          label="Credit Hours"
          id="credit"
          placeholder="Enter Course Credit Hours"
          type="number"
          required
          max={4}
          min={0}
          value={credit}
          onChange={(e) => setCredit(e.target.value)}
        />
      </div>

      <div>
        <Button
          type="submit"
          disabled={!name || !code || !credit}
          loading={isLoading}
        >
          Update
        </Button>
      </div>
    </form>
  );
};

export default EditCourseForm;
