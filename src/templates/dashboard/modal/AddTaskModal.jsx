import { useSupabase } from "../../../SupaClient";
import { useOutletContext } from 'react-router-dom';

export const AddTaskModal = ({ openmodals,fetchTableHeadersAndTasks, tableId,setAddTaskModals }) => {
  const supabase = useSupabase();
  const { session, setAddTaskModal} = useOutletContext();

  const handleAddTask = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const taskTitle = formData.get('addTaskName');
    const taskDescription = formData.get('addTaskArea');

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ user_id: user.id, header_id: tableId, status: taskTitle, description: taskDescription }]);

    if (error) {
      console.error("Error adding task:", error);
    } else {
      console.log("Task added successfully:", data);
      fetchTableHeadersAndTasks();
      setAddTaskModal(false);
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {openmodals && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setAddTaskModals(false)}></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg shadow-lg z-50 w-1/3 p-[15px]" onClick={handleModalClick}>
            <div className="flex justify-end">
              <button onClick={() => setAddTaskModals(false)}>Kapat</button>
            </div>
            <h3 className="text-2xl text-center">Yeni Görev Ekleyiniz</h3>
            <form onSubmit={handleAddTask} className='mt-[20px] flex-column'>
              <input 
                type="text" 
                name='addTaskName' 
                className="w-full border border-slate-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#635fc7] mr-[20px] mb-[15px]"
                placeholder='Görev Başlığı Gir' 
              />
              <textarea 
                name='addTaskArea' 
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
  );
};