import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login/loginPage";
import Dashboard from "./pages/dashboard/dashboard";
import DashboardLayout from "./layout/DashboardLayout";
import StudentPage from "./pages/student/studentPage";
import TeacherPage from "./pages/teacher/teacherPage";
import ProtectedRoute from "./components/ProtecttedRoute";

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
          <Route path="teachers" element={<TeacherPage />} />
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
