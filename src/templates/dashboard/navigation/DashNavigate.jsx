import { Link } from "react-router-dom"

export default function DashNavigate(){
     return(
        <>
            <li>
               <Link to="add-task"> Task Ekle.</Link>
            </li> 
            <li>
               <Link to="completed-task">Tamamlanmış Taskler</Link>
            </li> 
        </>
     )
}