import { useContext } from "react";
import { createContext,useState } from "react";


const EditTaskContext = createContext();

export const EditTaskProvider =({children}) => {
    const [currentTaskId, setCurrentTaskId] = useState(null);
    const [addTaskEditModal, setAddTaskEditModal] = useState(false)

    const openEditModal = (taskId) => {
        setAddTaskEditModal(true);
        setCurrentTaskId(taskId); 
    };
   return(
    <EditTaskContext.Provider value={{setAddTaskEditModal, addTaskEditModal, openEditModal, currentTaskId}}>
        {children}
    </EditTaskContext.Provider>
   )
}

export const useEditTaskContext = () => {
    return useContext(EditTaskContext)
}