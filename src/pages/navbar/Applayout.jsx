import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../Hooks/ThemeContext";

export default function AppLayout() {

  const { theme } = useContext(ThemeContext); 

  return (
    <div data-theme={theme} className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-950 text-black dark:text-white">
        <Navbar />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 p-4 overflow-auto bg-white dark:bg-gray-950 text-black dark:text-white">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
