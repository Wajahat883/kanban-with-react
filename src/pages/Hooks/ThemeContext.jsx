import { createContext, useEffect, useState } from "react";

// Create the theme context
export const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // This effect runs once when the component mounts
  useEffect(() => {
    // Get the saved theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    console.log("Theme fetched from localStorage:", savedTheme); // Debugging line

    // Set theme and toggle dark mode class on <html>
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"; // Switch theme
    console.log("New theme toggled to:", newTheme); // Debugging line

    setTheme(newTheme); // Update state
    localStorage.setItem("theme", newTheme); // Save the new theme to localStorage

    // Toggle the "dark" class on <html> to apply dark mode styles
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    console.log("Dark class added:", newTheme === "dark"); // Debugging line
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
