import { useOutletContext } from 'react-router-dom';
import { useSupabase } from "../../SupaClient";

export default function Dashboard(){

    const { session } = useOutletContext();
    const user = session?.user;
    const supabase = useSupabase();

    

    const handleSignOut = async() => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Error signing out:', error);
        else navigate('/login');
    }

    return(
        <>
            <div className="flex h-screen">
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
                        
                    </div>
                </div>
                <div className="basis-full bg-[#F4F7FD]">
                    <div className="flex justify-between items-center py-4 px-[50px] bg-white">
                        <h2 className="text-3xl color-black">Platform Lounch</h2>
                        <button className="bg-[#635FC7] p-[15px] text-white rounded-[35px] w-[175px]">+ Add New Task</button>
                    </div>
                </div>
            </div>
        </>
    )
}