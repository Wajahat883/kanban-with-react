// Navbar.jsx
import { useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useTask } from "../Hooks/TaskContext";
import { useAuth } from "../Hooks/useAuth";
import AvatarDropdown from "../navbar/Avatardropdown";
import SearchBar from "./SearchBar";
import PopupForm from "./PopupForm";

const Navbar = ({ toggleSidebar }) => {
  const { addTask } = useTask();
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  const handleAddTask = (task) => {
    addTask({ ...task, id: Date.now().toString() });
    setShowPopup(false);
  };

  return (
    <div className="relative z-50 dark:bg-gray-900">
      <header className="flex flex-row sm:justify-between items-center px-4 py-3 border-b border-gray-400 gap-5">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-2xl text-white"
        >
          ☰
        </button>

        <h1 className="text-xl font-bold">
          <span className="text-blue-600">Kanban</span>Board
        </h1>

        <SearchBar />

        <div className="flex items-center gap-3 flex-row">
          {user && (
            <button
              onClick={() => setShowPopup(!showPopup)}
              className="bg-blue-600 flex items-center gap-1 px-3 py-1 rounded hover:bg-blue-500 text-white"
            >
              <Plus size={16} />
              New Project
            </button>
          )}

          {!user ? (
            <>
              <Link to="/" className="hover:underline">
                Login
              </Link>
              <Link to="/signup" className="hover:underline">
                Signup
              </Link>
            </>
          ) : (
            <AvatarDropdown />
          )}
        </div>
      </header>

      {showPopup && <PopupForm onClose={() => setShowPopup(false)} onSubmit={handleAddTask} />}
    </div>
  );
};

export default Navbar;
