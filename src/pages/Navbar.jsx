import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTask } from "./TaskContext";
import { useAuth } from "./useAuth"; 

const Navbar = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addTask } = useTask();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title, description });
    setTitle("");
    setDescription("");
    navigate("/dashboard");
  };

  const handleLogout = () => {
    logout(); 
    navigate("/"); 
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="font-bold">Kanban App</div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-1 rounded text-black bg-white"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-3 py-1 rounded text-black bg-white"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          Add
        </button>
      </form>

      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
          </>
        ) : (
          <>
            <span>{user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-2 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
