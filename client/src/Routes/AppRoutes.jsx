import { Route, Routes } from "react-router-dom";
import AllCourses from "../components/Course/AllCourses/AllCourses";
import CreateCourse from "../components/Course/CreateCourse/CreateCourse";
import { Home } from "../components/Home/Home";
import Layout from "../components/Layout/Layout";
import AllTimeSlots from "../components/Miscellaneous/AllTimeSlots/AllTimeSlots";
import TimeSlotForm from "../components/Miscellaneous/TimeSlotForm";
import { NotFound } from "../components/NotFound";
import CreateRoutine from "../components/Routine/CreateRoutine/CreateRoutine";
import GetRoutine from "../components/Routine/GetRoutine/GetRoutine";
import AllSemesters from "../components/Semester/AllSemesters/AllSemesters";
import CreateSemester from "../components/Semester/CreateSemester/CreateSemester";
import AllTeachers from "../components/Teacher/AllTeachers/AllTeachers";
import CreateTeacher from "../components/Teacher/CreateTeacher/CreateTeacher";

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/routine">
          <Route path="createRoutine" element={<CreateRoutine />} />
          <Route path="getRoutine" element={<GetRoutine />} />
        </Route>

        <Route path="/teacher">
          <Route path="new" element={<CreateTeacher />} />
          <Route path="all" element={<AllTeachers />} />
        </Route>
        <Route path="/course">
          <Route path="new" element={<CreateCourse />} />
          <Route path="all" element={<AllCourses />} />
        </Route>

        <Route path="/semester">
          <Route path="new" element={<CreateSemester />} />
          <Route path="all" element={<AllSemesters />} />
        </Route>

        <Route path="/miscellaneous">
          <Route path="timeSlot" element={<TimeSlotForm />} />
          <Route path="timeSlot/all" element={<AllTimeSlots />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;