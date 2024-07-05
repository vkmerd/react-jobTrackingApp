// TaskContext.js
import React, { createContext, useState, useContext } from 'react';

const TableTaskContext = createContext();

export const useTableTaskContext = () => useContext(TableTaskContext);

export const TableTaskProvider = ({ children }) => {
  const [tableName, setTableName] = useState([]);
  const [tasks, setTasks] = useState([]);

  return (
    <TableTaskContext.Provider value={{ tableName, setTableName, tasks, setTasks }}>
      {children}
    </TableTaskContext.Provider>
  );
};
