import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAddCourseMutation } from "../../../features/course/courseApi";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

const CourseForm = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [credit, setCredit] = useState("");
  const [file, setFile] = useState(null);

  const [addCourse, { isLoading, isError, error }] = useAddCourseMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("courseName", name);
    formData.append("courseCode", code);
    formData.append("creditHours", credit);
    formData.append("file", file);

    const res = await addCourse(formData);

    if (res.data) {
      toast.success("Course created successfully");
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
          disabled={file}
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
          disabled={file}
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
          disabled={file}
          onChange={(e) => setCredit(e.target.value)}
        />
      </div>
      <div className="w-full border-t-4 border-gray-200 pt-2">
        <Input
          label="Course Information"
          id="info"
          type="file"
          accept=".csv"
          disabled={name || code || credit}
          onChange={handleFileChange}
        />
        <p className="text-sm text-red-600 font-bold mt-2">
          Upload an CSV file with fields (Serial, Course Name, Course Code,
          Credit Hours)
        </p>
      </div>

      <div>
        <Button
          type="submit"
          disabled={(!name || !code || !credit) && !file}
          loading={isLoading}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CourseForm;
