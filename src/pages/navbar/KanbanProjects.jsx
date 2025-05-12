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
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const sourceTasks = [...tasks[sourceCol]];
    const destTasks = [...tasks[destCol]];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceCol === destCol) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setTasks((prev) => ({
        ...prev,
        [sourceCol]: sourceTasks,
      }));
    } else {
      destTasks.splice(destination.index, 0, movedTask);
      setTasks((prev) => ({
        ...prev,
        [sourceCol]: sourceTasks,
        [destCol]: destTasks,
      }));
    }
  };

  const addTask = () => {
    const taskToAdd = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      date: newTask.date,
    };
    setTasks((prev) => ({
      ...prev,
      all: [...prev.all, taskToAdd],
    }));
    setShowForm(false);
    setNewTask({ title: "", description: "", date: "" });
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
                className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg w-80 min-h-[400px] shadow-md"
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
                  <div className="bg-white p-3 rounded shadow mb-3 space-y-2">
                    <input
                      type="text"
                      placeholder="Title"
                      className="w-full p-1 border rounded"
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                    />
                    <textarea
                      placeholder="Description"
                      className="w-full p-1 border rounded"
                      value={newTask.description}
                      onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                      }
                    />
                    <input
                      type="date"
                      className="w-full p-1 border rounded"
                      value={newTask.date}
                      onChange={(e) =>
                        setNewTask({ ...newTask, date: e.target.value })
                      }
                    />
                    <button
                      onClick={addTask}
                      className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700"
                    >
                      Add Task
                    </button>
                  </div>
                )}

                {tasks[col]?.map((task, index) => (
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
