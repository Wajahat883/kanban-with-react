import { createContext, useEffect, useState } from "react";


export const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  
  useEffect(() => {
   
    const savedTheme = localStorage.getItem('theme') || 'light';
    console.log("Theme fetched from localStorage:", savedTheme); 

    
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

 
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    console.log("New theme toggled to:", newTheme); 

    setTheme(newTheme); 
    localStorage.setItem("theme", newTheme); 

   
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    console.log("Dark class added:", newTheme === "dark"); 
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
