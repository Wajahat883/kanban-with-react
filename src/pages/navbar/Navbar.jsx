import {  useState, useRef, useEffect } from "react";

import { Plus } from "lucide-react";
import {  Link } from "react-router-dom";
import { useTask } from "../Hooks/TaskContext";
import { useAuth } from "../Hooks/useAuth";
import AvatarDropdown from"../navbar/Avatardropdown"
const Navbar = () => {
  
  const { addTask } = useTask();
  const { user,  } = useAuth();


  // const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const popupRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

        
    addTask({
      id: Date.now().toString(),
      name: title,
      description,
      date,
    });

 
    setTitle("");
    setDescription("");
    setDate("");
    setShowPopup(false);
  };



  return (
    <div className="relative z-50">
      <header className="flex justify-between items-center px-6 py-3 bg-blue-950  text-white dark:bg-blue-950 border-b border-b-gray-400">
        <h1 className="text-xl font-bold ">Kanban Board</h1>

        <div className="flex items-center gap-4 relative">
                     

        
          <div className="relative">
            {user && (
              <button
                onClick={() => setShowPopup(!showPopup)} 
                className="bg-blue-600 flex items-center gap-1 px-3 py-1 rounded hover:bg-blue-500"
              >
                <Plus size={16} />
                Add Task
              </button>
            )}

            {showPopup && (
              <div
                ref={popupRef} 
                className="absolute top-full mt-2 right-0 bg-white border rounded shadow-lg p-4 w-80 z-50"
              >
                <form onSubmit={handleSubmit} className="space-y-3">
                  <h2 className="text-lg font-bold items-center text-black">Add Task</h2>
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border px-3 py-1 rounded text-black"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border px-3 py-1 rounded text-black"
                  />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border px-3 py-1 rounded text-black"
                  />
                  <div className="flex justify-between">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Add</button>
                    <button type="button" onClick={() => setShowPopup(false)} className="text-red-500">Cancel</button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {!user ? (
            <>
              <Link to="/" className="hover:underline">Login</Link>
              <Link to="/signup" className="hover:underline">Signup</Link>
            </>
          ) : (
            <>
              <AvatarDropdown/>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
