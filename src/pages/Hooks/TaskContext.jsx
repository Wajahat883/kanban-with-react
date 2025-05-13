
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({
    all: [],
    pending: [],
    completed: []
  });

  const addTask = ({ title, description, date }) => {
    if (title && description && date) {
      const newTask = {
        id: uuidv4(),
        title,
        description,
        date,
        status: "all"  
      };
      setTasks((prev) => ({
        ...prev,
        all: [...prev.all, newTask],     
        // pending: [...prev.pending, newTask] 
      }));
    } else {
      console.log("Please fill in all fields");
    }
  };

  const changeTaskStatus = (taskId, status) => {
    setTasks((prev) => {
      const updatedAll = prev.all.map((task) => 
        task.id === taskId ? { ...task, status } : task
      );

      const updatedPending = updatedAll.filter((task) => task.status === 'pending');
      const updatedCompleted = updatedAll.filter((task) => task.status === 'completed');

      return {
        ...prev,
        all: updatedAll,
        pending: updatedPending,
        completed: updatedCompleted
      };
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, changeTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
