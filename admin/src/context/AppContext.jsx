import { createContext, useContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  const currency = "$"

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();

    return age
  }

      const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const slotDateFormate = (slotDate) => {
        const dateArray = slotDate.split("_");
        return (
          dateArray[0] + " " + month[Number(dateArray[1])] + " " + dateArray[2]
        );
      };

  const value = {
    calculateAge,
    slotDateFormate,
    currency
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
