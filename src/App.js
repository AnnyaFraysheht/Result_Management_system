import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login/loginPage";
import ProtectedRoute from "./components/ProtecttedRoute";
import Dashboard from "./pages/dashboard/dashboard";
import DashboardLayout from "./layout/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/*"
          element={<ProtectedRoute allowedRoles={["admin"]} >
            <DashboardLayout />
          </ProtectedRoute>}
        >
            <Route index element={<Dashboard />}   />

        </Route>
        
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
