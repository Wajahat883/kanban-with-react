import { Link } from "react-router-dom";
import { Home, Settings, LayoutDashboard } from "lucide-react";

export default function Sidebar({ closeSidebar }) {
  return (
    <aside className="w-64 h-full bg-white dark:bg-gray-900 p-4 border-r border-gray-400 md:relative z-50">

     
      <div className="flex justify-end md:hidden">
        <button onClick={closeSidebar} className="text-red-500 text-lg">✕</button>
      </div>

      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <nav>
        <ul className="space-y-3">
          <li>
            <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 font-bold flex items-center gap-2 px-3 py-2 rounded">
              <Home size={20} className="text-gray-800 dark:text-white" />
              Dashboard
            </Link>
          </li>
           <li>
            <Link to="/kanban" className="hover:text-blue-600 dark:hover:text-blue-400 font-bold flex items-center gap-2 px-3 py-2 rounded">
             Tasks-Projects
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="hover:text-blue-600 dark:hover:text-blue-400 font-bold flex items-center gap-2 px-3 py-2 rounded">
           Tasks
            
            </Link>
          </li>
         
           <li>
            <Link to="/issues" className="hover:text-blue-600 dark:hover:text-blue-400 font-bold flex items-center gap-2 px-3 py-2 rounded">
            Issues
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
