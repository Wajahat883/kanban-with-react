import { createContext, useEffect, useState } from "react";


export const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  
 useEffect(() => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  console.log("Theme fetched from localStorage:", savedTheme); 

  setTheme(savedTheme);
  document.documentElement.setAttribute("data-theme", savedTheme);
}, []);

const toggleTheme = () => {
  const newTheme = theme === "light" ? "dark" : "light";
  console.log("Toggling theme to:", newTheme); 

  setTheme(newTheme); 
  localStorage.setItem("theme", newTheme); 
  document.documentElement.setAttribute("data-theme", newTheme);
};


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
