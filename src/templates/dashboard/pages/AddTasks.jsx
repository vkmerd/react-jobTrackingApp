import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useSupabase } from "../../../context/SupaClient";
import { AddTaskModal } from "../modal/AddTaskModal";
import { useTaskContext } from "../../../context/TaskContext";
import { useEditTaskContext } from "../../../context/EditTaskContext";
import { AddTaskEditModal } from "../modal/AddTaskEditModal";
import CompletedTasks from "./CompletedTasks";
import { useTableandHeadersTaskContext } from "../../../context/FetchTableHeaderContext";

export default function AddTasks() {
  const { session } = useOutletContext();
  const user = session?.user;
  const { addTaskModal, setAddTaskModal, selectedTableId, setSelectedTableId } = useTaskContext();
  const { setAddTaskEditModal, addTaskEditModal, openEditModal } = useEditTaskContext();
  const { tableName, tasks, fetchTableHeadersAndTasks } = useTableandHeadersTaskContext();

  const [completedTask, setCompletedTask] = useState(false);

  const supabase = useSupabase();

  useEffect(() => {
    if (user) {
      fetchTableHeadersAndTasks();
    }
  }, [user]);

  const handlePlusClick = (tableId) => {
    setSelectedTableId(tableId);
    setAddTaskModal(true);
  };

  const completedEditTask = async (completedTaskId) => {
    const { data, error } = await supabase
      .from('tasks')
      .update({ completed: true })
      .eq('id', completedTaskId);

    if (error) {
      console.error("Error updating task:", error);
      return;
    }
    alert("Task tamamlandı");
    fetchTableHeadersAndTasks();
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-x-scroll xl:grid-cols-3 2xl:grid-cols-4 items-start h-full">
        {tableName.map((table) => (
          <div key={table.id} className="p-4 m-2 bg-white rounded shadow">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl">{table.title}</h3>
              <button
                className="bg-[#635FC7] p-[10px] text-white rounded-[15px]"
                onClick={() => handlePlusClick(table.id)}>+</button>
            </div>
            <div className="mt-4">
              {tasks.filter(task => task.header_id === table.id && !task.completed).map((task) => (
                <div key={task.id} className="p-2 m-2 bg-gray-100 rounded">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-xl">{task.status}</h4>
                      <p>{task.description}</p>
                    </div>
                    <div>
                      <button
                        className="bg-[#635FC7] p-[10px] text-white rounded-[5px]"
                        onClick={() => openEditModal(task.id)}>+</button>
                      <button
                        className="bg-[#635FC7] p-[10px] text-white rounded-[5px] ml-[10px]"
                        onClick={() => { setCompletedTask(true); completedEditTask(task.id); }}
                      >Ok</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <AddTaskModal
        openmodal={addTaskModal}
        setAddTaskModal={setAddTaskModal}
        tableId={selectedTableId}
        fetchTableHeadersAndTasks={fetchTableHeadersAndTasks}
      />
      <AddTaskEditModal fetchTableHeadersAndTasks={fetchTableHeadersAndTasks} />
      <CompletedTasks tableName={tableName} tasks={tasks} />
    </>
  );
}