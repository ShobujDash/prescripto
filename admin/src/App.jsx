import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar";
import { useAdminContext } from "./context/AdminContext";
import AddDoctor from "./pages/Admin/AddDoctor";
import AllApointments from "./pages/Admin/AllApointments";
import Dashboard from "./pages/Admin/Dashboard";
import Doctorlist from "./pages/Admin/Doctorlist";
import Login from "./pages/Login";
import { useDoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { aToken } = useAdminContext();
  const { dToken } = useDoctorContext();



  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return aToken || dToken ? (
    <div className={`${darkMode && "dark"} font-quicksand`}>
      <Header
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin Route */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-apointments" element={<AllApointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<Doctorlist />} />

          {/* Doctor Route */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard/>} />
          <Route path="/doctor-appointments" element={<DoctorAppointments/>} />
          <Route path="/doctor-profile" element={<DoctorProfile/>} />
        </Routes>
      </div>

      <ToastContainer />
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
}

export default App;
