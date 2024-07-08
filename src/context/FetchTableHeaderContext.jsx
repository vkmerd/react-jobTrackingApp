import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSupabase } from '../context/SupaClient';

const TableTaskContext = createContext();

export const TableHeaderandTaskProvider = ({ children }) => {
  const supabase = useSupabase();
  const [tableName, setTableName] = useState([]);
  const [tasks, setTasks] = useState([]);
  
  const fetchTableHeadersAndTasks = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const { data: tableHeaders, error: headersError } = await supabase
      .from('task_headers')
      .select('*')
      .eq('user_id', user.id);

    if (headersError) {
      console.error("Error fetching headers:", headersError);
      return;
    }

    const { data: tasks, error: tasksError } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id);

    if (tasksError) {
      console.error("Error fetching tasks:", tasksError);
      return;
    }

    setTableName(tableHeaders);
    setTasks(tasks);
  };

  useEffect(() => {
    fetchTableHeadersAndTasks();
  }, []);

  return (
    <TableTaskContext.Provider value={{ tableName, tasks, fetchTableHeadersAndTasks }}>
      {children}
    </TableTaskContext.Provider>
  );
};

export const useTableandHeadersTaskContext = () => useContext(TableTaskContext);