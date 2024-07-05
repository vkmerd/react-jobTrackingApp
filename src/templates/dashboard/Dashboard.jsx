import { useOutletContext } from 'react-router-dom';
import { useSupabase } from "../../SupaClient";
import DashNavigate from './navigation/DashNavigate';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { AddTableModal } from './modal/AddTableModal';
import { AddTaskModal } from './modal/AddTaskModal';

export default function Dashboard(){

    const { session } = useOutletContext();
    const user = session?.user;
    const supabase = useSupabase();
    const [addTableModal,setAddTableModal] = useState(false)
    const [addTaskModal,setAddTaskModal] = useState(false)

    const handleSignOut = async() => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Error signing out:', error);
        else navigate('/login');
    }
    const handleAddTableName = async (e) => {
        e.preventDefault();
        const addTableData = Object.fromEntries(new FormData(e.target));
        console.log(addTableData);
      
        const { data: { user } } = await supabase.auth.getUser();
      
        if (!user) {
          console.error("User not authenticated");
          return;
        }
      
        const { data, error } = await supabase
          .from('task_headers')
          .insert([{ user_id: user.id, title: addTableData.addTableName }]);
        
        if (error) {
          console.error("Error adding header:", error);
        } else {
          console.log("Header added successfully:", data);
        }
      }

    return(
        <>
            <div className="flex h-screen overflow-hidden">
            <AddTableModal openmodal={addTableModal} handleAddTableName={handleAddTableName} setAddTableModal={setAddTableModal} />
            <AddTaskModal openmodals={addTaskModal} setAddTaskModals={setAddTaskModal} />
                <div className="w-[350px] border-r border-r-gray-300 border-r-solid">
                    <div className="p-[25px]">
                        <img src="../../public/kanban-logo.png" alt="kanban-logo" />
                        {user ? (
                            <>
                                <p>Hoş geldin, {user.user_metadata.name_surname}!</p>
                                <button
                                onClick={handleSignOut}
                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                            >
                                Çıkış Yap
                            </button>
                            </>
                            ) : (
                                <p>Kullanıcı bilgisi alınamıyor.</p>
                        )}
                        <DashNavigate />
                    </div>
                </div>
                <div className="basis-full bg-[#F4F7FD]">
                    <div className="flex justify-between items-center py-4 px-[50px] bg-white">
                        <h2 className="text-3xl color-black">Platform Lounch</h2>
                        <button 
                        className="bg-[#635FC7] p-[15px] text-white rounded-[35px] w-[175px]"
                        onClick={() => setAddTableModal(!addTableModal)}
                        >+ Add New Table</button>
                    </div>
                    <div className="p-[50px] h-screen">
                        <Outlet context={{ session, setAddTaskModal  }} />
                    </div>
                </div>
            </div>
        </>
    )
}