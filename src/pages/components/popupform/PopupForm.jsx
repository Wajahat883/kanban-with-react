import React, { useState } from "react";

export default function PopupForm({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      date,
      status: "todo",
    };
    onSubmit(newTask);
    setTitle("");
    setDescription("");
    setDate("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center bg-[rgba(0,0,0,0.4)] backdrop-blur-sm justify-center bg-opacity-50  px-4">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter task title"
              className="w-full rounded-md px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

       
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter task description"
              className="w-full rounded-md px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

         
          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full rounded-md px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

        
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-md border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
