import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAddTeacherMutation } from "../../../features/teacher/teacherApi";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

const TeacherForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState(null);

  const [addTeacher, { isLoading }] = useAddTeacherMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phoneNo", phone);
    formData.append("shortCode", code);
    formData.append("file", file);

    const res = await addTeacher(formData);

    if (res.data) {
      toast.success("Teacher created successfully");
      setTimeout(() => {
        navigate("/teacher/all");
      }, 1000);
    }
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === "text/csv") {
      setFile(uploadedFile);
    } else {
      setError("Please upload a valid CSV file.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mt-4"
      encType="multipart/form-data"
    >
      <div className="w-full">
        <Input
          label="Name"
          id="name"
          placeholder="Enter Teacher Name"
          type="text"
          disabled={file}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="w-full">
        <Input
          label="Short Code"
          id="code"
          placeholder="Enter Teacher Short Code"
          type="text"
          disabled={file}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div className="w-full">
        <Input
          label="Email"
          id="email"
          placeholder="Enter Teacher Email"
          type="email"
          disabled={file}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-full">
        <Input
          label="Phone Number"
          id="phone"
          placeholder="Enter Teacher Phone Number"
          type="text"
          disabled={file}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="w-full border-t-4 border-gray-200 pt-2">
        <Input
          label="Teacher Information"
          id="info"
          type="file"
          accept=".csv"
          disabled={name || email || phone || code}
          onChange={handleFileChange}
        />
        <p className="text-sm text-red-600 font-bold mt-2">
          Upload an CSV file with fields (Serial, Name, Short code, Phone,
          Email)
        </p>
      </div>

      <div>
        <Button
          type="submit"
          disabled={(!name || !email || !phone || isLoading || !code) && !file}
          loading={isLoading}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default TeacherForm;
