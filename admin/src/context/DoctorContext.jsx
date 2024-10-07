import { createContext, useContext } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const value = {
    // Add any state or functions that you want to pass via context
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useDoctorContext = () => useContext(DoctorContext);

export default DoctorContextProvider;
