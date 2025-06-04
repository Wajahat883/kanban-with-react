
import { Link, useLocation } from "react-router-dom";

const SecondaryNavbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 shadow-sm">
      <div className="flex overflow-x-auto justify-around px-4 py-2 gap-4 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200">
        <Link
          to="/tasks"
          className={`${isActive("/tasks") ? "text-blue-600 font-bold" : ""} hover:text-blue-600 dark:hover:text-blue-400`}
        >
          Tasks
        </Link>
        <Link
          to="/teams"
          className={`${isActive("/teams") ? "text-blue-600 font-bold" : ""} hover:text-blue-600 dark:hover:text-blue-400`}
        >
          Teams
        </Link>
        <Link
          to="/reports"
          className={`${isActive("/reports") ? "text-blue-600 font-bold" : ""} hover:text-blue-600 dark:hover:text-blue-400`}
        >
          Reports
        </Link>
       
      
      </div>
    </nav>
  );
};

export default SecondaryNavbar;
