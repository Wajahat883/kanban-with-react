import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../Hooks/ThemeContext";
import { useState } from "react";
import SecondaryNavbar from "./Secondarynav";

export default function AppLayout() {

  const { theme } = useContext(ThemeContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div data-theme={theme} className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-950 text-black dark:text-white">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
            

        <div className="flex flex-1 overflow-hidden relative">
           <div className={`z-40 md:relative fixed h-full transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}>
             <Sidebar  closeSidebar={() => setIsSidebarOpen(false)}  />
          </div>
           <div className="flex-1 flex flex-col">
            
            <SecondaryNavbar />


          <main className="flex-1 p-4 overflow-auto bg-white dark:bg-gray-950 text-black dark:text-white">
            <Outlet />
          </main>
          </div>
        </div>
      </div>
    </div>
  );
}
