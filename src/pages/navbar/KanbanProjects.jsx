import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTask } from "../Hooks/TaskContext";
import { Plus } from "lucide-react";

export default function KanbanBoard() {
  const { tasks, setTasks } = useTask();
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: "",
  });

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination || !source) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Find task to move
    const updatedTasks = [...tasks.all];
    const taskIndex = updatedTasks.findIndex((task) => task.id === draggableId);
    if (taskIndex === -1) return;

    const updatedTask = { ...updatedTasks[taskIndex] };
    updatedTask.status = destination.droppableId;
    updatedTasks[taskIndex] = updatedTask;

    setTasks({
      all: updatedTasks,
    });
  };

  const addTask = () => {
    const taskToAdd = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      date: newTask.date,
      status: "all",
    };

    setTasks((prev) => ({
      ...prev,
      all: [...prev.all, taskToAdd],
    }));

    setShowForm(false);
    setNewTask({ title: "", description: "", date: "" });
  };

  const getFilteredTasks = (col) => {
    return tasks.all.filter((task) => task.status === col);
  };

  return (
    <div className="flex gap-4 p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        {["all", "pending", "completed"].map((col) => (
          <Droppable key={col} droppableId={col}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg w-80 min-h-[400px] shadow-md text-black dark:text-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg capitalize">{col}</h3>
                  {col === "all" && (
                    <button
                      onClick={() => setShowForm(true)}
                      className="text-xl hover:text-green-600"
                    >
                      <Plus size={20} />
                    </button>
                  )}
                </div>

                {showForm && col === "all" && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addTask();
                    }}
                    className="bg-white dark:bg-gray-900 p-3 rounded shadow mb-3 space-y-2"
                  >
                    <input
                      type="text"
                      placeholder="Title"
                      required
                      className="w-full p-1 border rounded text-black dark:text-white"
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                    />
                    <textarea
                      placeholder="Description"
                      required
                      className="w-full p-1 border rounded text-black dark:text-white"
                      value={newTask.description}
                      onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                      }
                    />
                    <input
                      type="date"
                    
                      className="w-full p-1 border rounded text-black dark:text-white bg-white dark:bg-gray-800"
                      value={newTask.date}
                      onChange={(e) =>
                        setNewTask({ ...newTask, date: e.target.value })
                      }
                    />
                    <button
                      type="submit"
                      className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700"
                    >
                      Add Task
                    </button>
                  </form>
                )}

                {getFilteredTasks(col).map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white dark:bg-gray-800 p-3 mb-3 rounded shadow"
                      >
                        <strong>{task.title}</strong>
                        <p className="text-sm">{task.description}</p>
                        <p className="text-xs text-gray-500">Due: {task.date}</p>
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}
