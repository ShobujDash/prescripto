import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(
    localStorage.getItem("DToken") ? localStorage.getItem("DToken") : ""
  );
  const [appointments,setAppointments] = useState([])
  const [dashData,setDashData] = useState(false)

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/appointments", { headers: { dToken } });
      if (data?.success) {
        setAppointments(data?.appointments);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },{headers:{dToken}}
      );

      if (data?.success) {
        toast.success(data?.message)
        getAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { dToken } }
      );

      if (data?.success) {
        toast.success(data?.message)
        getAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", { headers: { dToken } });

      if (data.success) {
        setDashData(data.dashData)
        getAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const value = {
    dToken,
    setDToken,
    backendUrl,
    getAppointments,
    appointments,
    completeAppointment,
    cancelAppointment,
    getDashData,
    dashData,
    setDashData
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useDoctorContext = () => useContext(DoctorContext);

export default DoctorContextProvider;
