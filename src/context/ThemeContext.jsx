// import { createContext } from "react";

// export const ThemeContext = createContext();

import { createContext, useState, useContext } from "react";

// Buat context
const ThemeContext = createContext();

// Provider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light"); // Default tema adalah 'light'

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook untuk menggunakan ThemeContext
export function useTheme() {
  return useContext(ThemeContext);
}
