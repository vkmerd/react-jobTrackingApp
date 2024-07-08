import { useOutletContext, useNavigate } from 'react-router-dom';
import { useSupabase } from "../../context/SupaClient";
import DashNavigate from './navigation/DashNavigate';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { AddTableModal } from './modal/AddTableModal';
import { AddTaskModal } from './modal/AddTaskModal';
import { AddTaskEditModal } from './modal/AddTaskEditModal';
import { useTableandHeadersTaskContext } from '../../context/FetchTableHeaderContext';

export default function Dashboard(){
    const { session } = useOutletContext();
    const user = session?.user;
    const supabase = useSupabase();
    const navigate = useNavigate();
    const [addTableModal, setAddTableModal] = useState(false);
    const [addTaskModal, setAddTaskModal] = useState(false);
    const { fetchTableHeadersAndTasks } = useTableandHeadersTaskContext();
    
    const handleSignOut = async() => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Error signing out:', error);
        else navigate('/login');
    };

    const handleAddTableName = async (e) => { 
        e.preventDefault(); 
        const addTableData = Object.fromEntries(new FormData(e.target));

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
            fetchTableHeadersAndTasks();
            setAddTableModal(false);
        }
    };

    return (
        <>
            <div className="flex h-screen overflow-hidden">
                <AddTableModal openmodal={addTableModal} handleAddTableName={handleAddTableName} setAddTableModal={setAddTableModal} />
                <AddTaskModal openmodal={addTaskModal} setAddTaskModal={setAddTaskModal} />
                <AddTaskEditModal />
                <div className="w-[350px] border-r border-r-gray-300 border-r-solid">
                    <div className="p-[25px]">
                        <img src="/../kanban-logo.png" alt="kanban-logo" />
                        {user ? (
                            <>
                                <p className='mt-[20px]'>Hoş geldin, <b>{user.user_metadata.name_surname}!</b></p>
                            </>
                        ) : (
                            <p>Kullanıcı bilgisi alınamıyor.</p>
                        )}

                        <DashNavigate />
                        {
                            user ? (
                                <>
                                <button
                                    onClick={handleSignOut}
                                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                                >
                                    Çıkış Yap
                                </button>
                                </>
                            ) : (
                                <p>Kullanıcı yok.</p>
                            )
                        }
                    </div>
                </div>
                <div className="basis-full bg-[#F4F7FD]">
                    <div className="flex justify-between items-center py-4 px-[50px] bg-white">
                        <h2 className="text-3xl color-black">Platform Launch</h2>
                        <button 
                            className="bg-[#635FC7] p-[15px] text-white rounded-[35px] w-[175px]"
                            onClick={() => setAddTableModal(!addTableModal)}
                        >
                            + Add New Table
                        </button>
                    </div>
                    <div className="p-[20px] h-screen">
                        <Outlet context={{ session, setAddTaskModal }} />
                    </div>
                </div>
            </div>
        </>
    );
}