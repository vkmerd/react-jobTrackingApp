import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState(null);

  return (
    <TaskContext.Provider value={{ addTaskModal, setAddTaskModal, selectedTableId, setSelectedTableId }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
