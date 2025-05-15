// Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { Plus,Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useTask } from "../Hooks/TaskContext";
import { useAuth } from "../Hooks/useAuth";
import AvatarDropdown from "../navbar/Avatardropdown";

const Navbar = ({toggleSidebar}) => {
  const { addTask } = useTask();
  const { user } = useAuth();

  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [searchQuery,setsearchquery]=useState("")

  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

const handleSearch =(e)=>{
  e.preventDefault()
  if(searchQuery.trim()==="")return
  console.log("searching for:", searchQuery)
  setsearchquery("")
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      id: Date.now().toString(),
      title,
      description,
      date,
    });

    setTitle("");
    setDescription("");
    setDate("");
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

        <h1 className="text-xl font-bold">Kanban Board</h1>
      <div>
  <form
    onSubmit={handleSearch}
    className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden bg-white dark:bg-gray-700"
  >
    <input
      type="text"
      placeholder="Search from the web"
      value={searchQuery}
      onChange={(e) => setsearchquery(e.target.value)}
      className="px-3 py-1.5 text-sm focus:outline-none dark:bg-gray-700 dark:text-white"
    />
    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white p-2"
    >
      <Search className="h-4 w-4" />
    </button>
  </form>
</div>


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

         

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-[rgba(0,0,0,0.4)] backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          ></div>

          <div
            ref={popupRef}
            className="relative bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-xl p-6 w-[90%] max-w-md z-50"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold text-center text-black dark:text-white">
                New Project
              </h2>

              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border px-3 py-2 rounded text-black dark:text-white"
                required
              />

              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border px-3 py-2 rounded text-black dark:text-white"
              />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border px-3 py-2 rounded text-black dark:text-white"
              />

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="text-red-500 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
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
      


    </div>
  );
};

export default Navbar;
