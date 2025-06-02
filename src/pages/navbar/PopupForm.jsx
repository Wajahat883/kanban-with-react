



import { useEffect, useRef, useState } from "react";


const PopupForm = ({ onClose, onSubmit }) => {
  const popupRef = useRef(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: "",
    member: "",
    category: "",
  });

  const categories = [
    { id: "marketing", name: "Marketing" },
    { id: "store-design", name: "Store Design" },
    { id: "development", name: "Development" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.category) return;
    onSubmit(newTask);

    setNewTask({
      title: "",
      description: "",
      date: "",
      member: "",
      category: "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,0.4)] backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div
        ref={popupRef}
        className="relative bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-xl p-6 w-[90%] max-w-md z-50"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold text-center text-black dark:text-white">
            New Task
          </h2>

          <input
            type="text"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({ ...newTask, title: e.target.value })
            }
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded text-black dark:text-white"
            required
          />

          <input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded text-black dark:text-white"
          />

          <input
            type="date"
            value={newTask.date}
            onChange={(e) =>
              setNewTask({ ...newTask, date: e.target.value })
            }
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded text-black dark:text-white"
          />

          <select
            value={newTask.category}
            onChange={(e) =>
              setNewTask({ ...newTask, category: e.target.value })
            }
            required
            className="w-full p-1 border rounded text-black dark:text-white bg-white dark:bg-gray-800"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Add
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-red-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
