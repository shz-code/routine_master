import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEditTeacherMutation } from "../../../features/teacher/teacherApi";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

const EditTeacherForm = ({ data }) => {
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [code, setCode] = useState(data.shortCode);
  const [phone, setPhone] = useState(data.phoneNo);

  const [editTeacher, { isLoading, isError, error }] = useEditTeacherMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await editTeacher({
      id: data.id,
      body: { name, email, shortCode: code, phoneNo: phone },
    });

    if (res.data) {
      toast.success("Teacher updated successfully");
      setTimeout(() => {
        navigate("/teacher/all");
      }, 1000);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(error.data?.detail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

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
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div>
        <Button
          type="submit"
          disabled={!name || !email || !phone || !code}
          loading={isLoading}
        >
          Update
        </Button>
      </div>
    </form>
  );
};

export default EditTeacherForm;
