import { Link } from "react-router-dom";
import { Home, Menu } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
    
      <div className="sm:hidden p-2">
        <button
          className="text-gray-800 dark:text-white z-50"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Sidebar"
        >
          <Menu size={24} />
        </button>
      </div>

      
      <aside
        className={`fixed sm:static top-0 left-0 h-full z-40 bg-white dark:bg-gray-900 border-r border-gray-400 w-64 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out sm:translate-x-0 sm:block`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">Projects</h2>
          <nav>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/dashboard"
                  className="hover:bg-gray-700 flex items-center gap-2  px-3 py-2 rounded text-gray-800 dark:text-white"
                  onClick={() => setOpen(false)} 
                >
                  <Home size={20} />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/Kanban"
                  className="hover:bg-gray-700 block px-3 py-2 rounded text-gray-800 dark:text-white"
                  onClick={() => setOpen(false)}
                >
                  Kanban-Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/tasks"
                  className="hover:bg-gray-700 block px-3 py-2 rounded text-gray-800 dark:text-white"
                  onClick={() => setOpen(false)}
                >
                  Tasks
                </Link>
              </li>
              <li>
                <Link
                  to="/issues"
                  className="hover:bg-gray-700 block px-3 py-2 rounded text-gray-800 dark:text-white"
                  onClick={() => setOpen(false)}
                >
                  Issues
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

     
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 sm:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}
