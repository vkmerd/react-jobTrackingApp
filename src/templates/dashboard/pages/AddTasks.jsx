import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useSupabase } from "../../../SupaClient";
import { AddTaskModal } from "../modal/AddTaskModal";

export default function AddTasks() {
  const { session, setAddTaskModal } = useOutletContext();
  const user = session?.user;
  const [tableName, setTableName] = useState([]);
  const [tasks, setTasks] = useState([]); 
  const [selectedTableId, setSelectedTableId] = useState(null);
  const supabase = useSupabase();

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
    if (user) {
      fetchTableHeadersAndTasks();
    }
  }, [user]);


  const handlePlusClick = (tableId) => {
    setSelectedTableId(tableId);
    setAddTaskModal(true);
  };

  return (
    <>
      <div className="grid grid-cols-4 items-start h-full">
        {tableName.map((table) => (
          <div key={table.id} className="p-4 m-2 bg-white rounded shadow">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl">{table.title}</h3>
              <button 
                className="bg-[#635FC7] p-[10px] text-white rounded-[15px]" 
                onClick={() => handlePlusClick(table.id)}>+</button>
            </div>
            <div className="mt-4">
              {tasks.filter(task => task.header_id === table.id).map((task) => (
                <div key={task.id} className="p-2 m-2 bg-gray-100 rounded">
                  <h4 className="text-xl">{task.title}</h4>
                  <p>{task.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <AddTaskModal openmodal={selectedTableId !== null} setAddTaskModal={setAddTaskModal} tableId={selectedTableId} fetchTableHeadersAndTasks={fetchTableHeadersAndTasks()} />
    </>
  );
}