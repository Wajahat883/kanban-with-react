// Sidebar.jsx
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 p-4 h-full  dark:bg-gray-900 border-b border-b-gray-400 border-r border-r-gray-400">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <nav className="flex-1">
        <ul className="space-y-3">
          <li><Link to="/dashboard" className="hover:bg-gray-700 flex items-center gap-2 block px-3 py-2 rounded">  <Home size={20} className="text-gray-800 dark:text-white" /> <span>Dashboard</span></Link></li>
          <li><Link to="/Kanban" className="hover:bg-gray-700 block px-3 py-2 rounded">Kanban-Projects</Link></li>
          <li><Link to="/tasks" className="hover:bg-gray-700 block px-3 py-2 rounded">Tasks</Link></li>
          <li><Link to="/issues" className="hover:bg-gray-700 block px-3 py-2 rounded">Issues</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
