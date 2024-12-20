import { useState } from "react";
import toast from "react-hot-toast";
import { useAddTeacherMutation } from "../../../features/teacher/teacherApi";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

const TeacherForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addTeacher, { isLoading }] = useAddTeacherMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addTeacher({ name: name, email: email, phoneNo: phone });
    if (res.data) {
      toast.success("Teacher created successfully");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="w-full">
        <Input
          label="Name"
          id="name"
          placeholder="Enter Teacher Name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="w-full">
        <Input
          label="Email"
          id="email"
          placeholder="Enter Teacher Email"
          type="email"
          required
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
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div>
        <Button
          type="submit"
          disabled={!name || !email || !phone || isLoading}
          loading={isLoading}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default TeacherForm;
