
import { SortableItem } from "./SortableItem"
import { Plus,X } from "lucide-react"
import { useState } from "react"
import { useTask } from "../Hooks/TaskContext"
import { v4 as uuidv4 } from 'uuid';

const TeamsPage = () => {
  const { tasks, setTasks } = useTask();  // Add setTasks here
  const [addingTaskFor, setAddingTaskFor] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    due: "",
    member: "",
    tag: "",
    category: "" 
  });

  const columns = [
    { id: "store-design", title: "Store Design" },
    { id: "marketing", title: "Marketing" },
    { id: "development", title: "Development" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = () => {
    if (!newTask.title) return alert("Task title is required");

    
    let assignedCategory = "store-design";

    const titleLower = newTask.title.toLowerCase();

    if (titleLower.includes("marketing")) {
      assignedCategory = "marketing";
    } else if (titleLower.includes("design") || titleLower.includes("store")) {
      assignedCategory = "store-design";
    } else if (titleLower.includes("development") || titleLower.includes("dev")) {
      assignedCategory = "development";
    } else {
  
      assignedCategory = addingTaskFor;
    }

    const taskToAdd = {
      id: uuidv4(),
      title: newTask.title.trim(),
      due: newTask.due,
      member: newTask.member.trim(),
      tag: newTask.tag.trim(),
      status: "pending",
      category: assignedCategory,  
    };

    setTasks((prev) => ({
      ...prev,
      all: [...prev.all, taskToAdd],
    }));

    setNewTask({ title: "", due: "", member: "", tag: "", category: "" });
    setAddingTaskFor(null);
  };

  return (
    <>
      <div className="flex gap-6 overflow-x-auto  p-6 dark:bg-black">
        {columns.map((col) => (
          <div
            key={col.id}
            className="min-w-[320px] bg-white dark:bg-gray-700 p-4 dark:text-white text-black rounded-lg shadow-md flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{col.title}</h2>
              <button
                onClick={() =>
                  setAddingTaskFor(addingTaskFor === col.id ? null : col.id)
                }
                className="text-blue-500 hover:text-blue-600"
                title="Add task"
              >
                {addingTaskFor === col.id ? <X size={18} /> : <Plus size={18} />}
              </button>
            </div>
            {addingTaskFor === col.id && (
              <div className="mb-4 space-y-2">
                <input
                  type="text"
                  name="title"
                  placeholder="Task Title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full"
                />
                <input
                  type="date"
                  name="due"
                  placeholder="Due Date"
                  value={newTask.due}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full"
                />
                <input
                  type="text"
                  name="member"
                  placeholder="Member"
                  value={newTask.member}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full"
                />
                <input
                  type="text"
                  name="tag"
                  placeholder="Tag"
                  value={newTask.tag}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full"
                />
                <button
                  onClick={handleAddTask}  
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Add Task
                </button>
              </div>
            )}

            {tasks.all
              .filter((task) => task.category === col.id)
              .map((task) => (
                <SortableItem key={task.id} task={task} />
              ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default TeamsPage;