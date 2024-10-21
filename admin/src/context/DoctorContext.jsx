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

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/appointments", { headers: { dToken } });
      if (data?.success) {
        setAppointments(data?.appointments.reverse());
        console.log(data?.appointments.reverse())
      } else {
        toast.error(data?.message);
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
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useDoctorContext = () => useContext(DoctorContext);

export default DoctorContextProvider;
