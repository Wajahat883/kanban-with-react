// TaskContext.js
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({
    all: [],
    pending: [],
    completed: []
  });

  const addTask = ({ title, description }) => {
    const newTask = {
      id: uuidv4(),
      title,
      description
    };
    setTasks(prev => ({
      ...prev,
      all: [...prev.all, newTask]
    }));
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
