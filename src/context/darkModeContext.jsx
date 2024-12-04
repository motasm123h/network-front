import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();
export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
  const [translateMode, setTranslateMode] = useState(JSON.parse(localStorage.getItem("translateMode")) || true);
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  useEffect(() => {
    localStorage.setItem("translateMode", translateMode)
  }, [translateMode])

  const toggle = () => {
    setDarkMode(!darkMode);
  };
  const translatToggle = () => {
    setTranslateMode(!translateMode);
  }

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle, translateMode, translatToggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};
