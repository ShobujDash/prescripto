import { createContext, useContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const value = {
    // Add any state or functions that you want to pass via context
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
