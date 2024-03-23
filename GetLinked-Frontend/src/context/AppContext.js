import React, { createContext } from "react";
// import axios from "axios";
// import config from "../config.json";

const AppContext = createContext();

const AppProvider = (props) => {
  return <AppContext.Provider value={{}}>{props.children}</AppContext.Provider>;
};

function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be within an AppProvider");
  }
  return context;
}

export { AppProvider, useAppContext };
