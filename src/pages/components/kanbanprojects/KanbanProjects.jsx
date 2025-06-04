import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Pencil, Trash2 } from "lucide-react";
import PopupForm from "../popupform/PopupForm";

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Example Task",
      description: "Example Description",
      date: "2025-06-05",
      status: "todo",
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const categories = [
    { id: "todo", name: "Todo" },
    { id: "pending", name: "Pending" },
    { id: "complete", name: "Complete" },
  ];

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    setTasks((prev) => {
      const updatedTasks = [...prev];
      const taskIndex = updatedTasks.findIndex((t) => t.id === draggableId);
      if (taskIndex === -1) return prev;

      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        status: destination.droppableId,
      };

      return updatedTasks;
    });
  };

  const addTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const editTaskHandler = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  const deleteTaskHandler = (taskId) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
  };

  const getTasksByStatus = (status) => tasks.filter((task) => task.status === status);

  return (
    <div className="p-5 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-900 ">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-5 text-gray-900 dark:text-white justify-between">
          {categories.map((cat) => (
            <div key={cat.id} className="w-93 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{cat.name}</h2>
                <button
                  onClick={() => setShowForm(true)}
                  title="Add new task"
                  className="font-bold text-2xl cursor-pointer bg-transparent border-none text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
                  type="button"
                >
                  +
                </button>
              </div>

              <Droppable droppableId={cat.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-200 dark:bg-gray-700 p-2 min-h-[500px] rounded-md shadow-sm"
                  >
                    {getTasksByStatus(cat.id).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white dark:bg-gray-800 mb-2 p-3 rounded shadow-sm relative group"
                            style={provided.draggableProps.style}
                          >
                            <h4 className="mb-1 font-semibold">{task.title}</h4>
                            <p className="mb-1 text-sm">{task.description}</p>
                            <small className="text-gray-600 dark:text-gray-400">
                              Due: {task.date || "No date"}
                            </small>

                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                              <button
                                onClick={() => editTaskHandler(task)}
                                className="text-blue-500 hover:text-blue-700"
                                title="Edit"
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                onClick={() => deleteTaskHandler(task.id)}
                                className="text-red-500 hover:text-red-700"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {showForm && (
        <PopupForm
          initialData={editTask}
          onClose={() => {
            setShowForm(false);
            setEditTask(null);
          }}
          onSubmit={(task) => {
            if (editTask) {
              setTasks((prev) =>
                prev.map((t) => (t.id === task.id ? { ...t, ...task } : t))
              );
            } else {
              addTask(task);
            }
            setShowForm(false);
            setEditTask(null);
          }}
        />
      )}
    </div>
  );
}