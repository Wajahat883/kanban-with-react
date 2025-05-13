import React from "react";
import { useTask } from "../Hooks/TaskContext";

export default function TaskCard() {
  const { tasks } = useTask();

  return (
    <div className="taskcard-container flex w-4xl gap-2">
      {tasks.all.map((task) => (
        <div key={task.id} className="taskcard bg-white dark:bg-gray-800 p-4 mb-4 rounded shadow w-3xl">
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p className="text-xs text-gray-500">Due: {task.date}</p>
          
        
          <p className={`text-sm font-semibold mt-2 ${
            task.status === "pending" ? "text-green-600" : "text-yellow-600"
          }`}>
            Status: {task.status}
          </p>
        </div>
      ))}
    </div>
  );
}
