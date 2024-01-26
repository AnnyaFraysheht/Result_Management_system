import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login/loginPage";
import Dashboard from "./pages/dashboard/dashboard";
import DashboardLayout from "./layout/DashboardLayout";
import StudentPage from "./pages/student/studentPage";
import TeacherPage from "./pages/teacher/teacherPage";
import ProtectedRoute from "./components/ProtecttedRoute";
import NoticePage from "./pages/notice/noticePage";
import AddNotice from "./pages/notice/addNotice";
import AddStudent from "./pages/student/addStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin/*" element={<ProtectedRoute Component={<DashboardLayout />} />}
        >
          <Route index element={<Dashboard />} />
          <Route path="students" element={<StudentPage />} />
          <Route path="students/add" element={<AddStudent />} />
          <Route path="teachers" element={<TeacherPage />} />
          <Route path="notice" element={<NoticePage />} />
          <Route path="notice/add" element={<AddNotice />} />
        </Route>
        <Route
          path="/student/*" element={<ProtectedRoute Component={<DashboardLayout />} />}
        >
          <Route index element={<Dashboard />} />
          <Route path="students" element={<StudentPage />} />
          <Route path="teachers" element={<TeacherPage />} />
        </Route>
        <Route
          path="/teacher/*" element={<ProtectedRoute Component={<DashboardLayout />} />}
        >
          <Route index element={<Dashboard />} />
          <Route path="students" element={<StudentPage />} />
          <Route path="teachers" element={<TeacherPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
