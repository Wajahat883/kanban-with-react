import { Link } from "react-router-dom";

export default function Sidebar(){
    return(
        <aside className="w-64 h-screen bg-gray-800 text-white p-4 fixed">
            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            <nav className="flex-1">
                <ul className="space-y-3">
                    <li><Link to="/dashboard" className="hover:bg-gray-700 block px-3 py-2 rounded">Dashboard</Link></li>
                    <li><Link to="/Kanban" className="hover:bg-gray-700 block px-3 py-2 rounded">Kanban</Link></li>
                    <li><Link to="/tasks" className="hover:bg-gray-700 block px-3 py-2 rounded">Tasks</Link></li>
                    <li><Link to="/issues" className="hover:bg-gray-700 block px-3 py-2 rounded">Issues</Link></li>
                </ul>
            </nav>
        </aside>
    )
}