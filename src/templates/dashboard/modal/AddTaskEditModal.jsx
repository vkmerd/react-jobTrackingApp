import { useEditTaskContext } from "../../../context/EditTaskContext";
import { useTableandHeadersTaskContext } from "../../../context/FetchTableHeaderContext";
import { useSupabase } from "../../../context/SupaClient";

export const AddTaskEditModal = () => {
  const { addTaskEditModal, setAddTaskEditModal, currentTaskId } = useEditTaskContext();
  const supabase = useSupabase();
  const { fetchTableHeadersAndTasks } = useTableandHeadersTaskContext();

  const updateTask = async (handleTaskEditData) => {
    if (!currentTaskId) {
      console.error("Task ID is null");
      return;
    }
    const { data, error } = await supabase
      .from('tasks')
      .update({ 
        status: handleTaskEditData.addEditTaskName, 
        description: handleTaskEditData.addEditTaskArea 
      })
      .eq('id', currentTaskId);

    if (error) {
      console.error("Error updating task:", error);
      return;
    }

    setAddTaskEditModal(false);
    fetchTableHeadersAndTasks();
  };   
    
  const handleEditTask = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    updateTask(formData); 
  }

  return (
    <>
      {addTaskEditModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setAddTaskEditModal(false)}></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg shadow-lg z-50 w-1/3 h-[300px]">
            <div className="flex justify-end">
              <button onClick={() => setAddTaskEditModal(false)}>Kapat</button>
            </div>
            <h3 className="text-2xl text-center">Görev Gerekliliklerini Düzelt</h3>
            <form onSubmit={handleEditTask} className='mt-[20px] flex-column'>
              <input 
                type="text" 
                name='addEditTaskName' 
                className="w-full border border-slate-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#635fc7] mr-[20px] mb-[15px]"
                placeholder='Görev Başlığı Gir' 
              />
              <textarea 
                name='addEditTaskArea' 
                className="w-full border border-slate-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#635fc7] mr-[20px] mb-[15px]"
                placeholder='Görev Açıklaması Gir' 
              />
              <input 
                type="submit" 
                className='w-full bg-black text-white p-2 rounded-md hover:bg-white hover:text-black hover:border hover:border-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300' 
                value="Ekle"
              />
            </form>
          </div>
        </>
      )}
    </>
  )
}