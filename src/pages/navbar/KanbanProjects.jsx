import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTask } from "../Hooks/TaskContext";
import { Plus } from "lucide-react";
import PopupForm from "./PopupForm"; // Make sure this path is correct

export default function KanbanBoard() {
  const { tasks, setTasks } = useTask();
  const [showForm, setShowForm] = useState(false);

  const categories = [
    { id: "marketing", name: "Marketing" },
    { id: "store-design", name: "Store Design" },
    { id: "development", name: "Development" },
  ];

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination || !source) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedTasks = [...tasks.all];
    const taskIndex = updatedTasks.findIndex((task) => task.id === draggableId);
    if (taskIndex === -1) return;

    const updatedTask = { ...updatedTasks[taskIndex] };
    updatedTask.category = destination.droppableId;
    updatedTasks[taskIndex] = updatedTask;

    setTasks({
      all: updatedTasks,
    });
  };

  const addTask = (newTask) => {
    const taskToAdd = {
      id: Date.now().toString(),
      ...newTask,
    };

    setTasks((prev) => ({
      ...prev,
      all: [...prev.all, taskToAdd],
    }));

    setShowForm(false);
  };

  const getFilteredTasks = (colId) => {
    return tasks.all.filter((task) => task.category === colId);
  };

  return (
    <div className="flex gap-4 p-4 overflow-x-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        {categories.map((col) => (
          <Droppable key={col.id} droppableId={col.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg w-80 min-h-[400px] shadow-md text-black dark:text-white flex-shrink-0"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">{col.name}</h3>
                  {col.id === "marketing" && (
                    <button
                      onClick={() => setShowForm(true)}
                      className="text-xl hover:text-green-600"
                      title="Add Task"
                    >
                      <Plus size={20} />
                    </button>
                  )}
                </div>

                {getFilteredTasks(col.id).map((task, index) => (
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

      {showForm && (
        <PopupForm onClose={() => setShowForm(false)} onSubmit={addTask} />
      )}
    </div>
  );
}
