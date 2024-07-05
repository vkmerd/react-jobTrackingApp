import { Link } from "react-router-dom"

export default function DashNavigate(){
     return(
        <>  
           <ul className="mt-[25px]">
               <li className="list-none mb-[10px]">
                  <Link to="/dashboard" className="hover:opacity-50 duration-300">+ Dashboard</Link>
               </li> 
               <li className="list-none mb-[10px]">
                  <Link to="add-task" className="hover:opacity-50 duration-300">+ Task Ekle.</Link>
               </li> 
               <li className="list-none mb-[10px]">
                  <Link to="completed-task" className="hover:opacity-50 duration-300">+ Tamamlanmış Taskler</Link>
               </li> 
           </ul>
        </>
     )
}