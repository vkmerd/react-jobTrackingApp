import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./templates/dashboard/Dashboard";
import Login from "./templates/login/Login";
import CompletedTasks from "./templates/dashboard/pages/CompletedTasks";
import AddTasks from "./templates/dashboard/pages/AddTasks";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
                children: [
                    {
                        path:'completed-task',
                        element:<CompletedTasks />   
                    },
                    {
                        index:true,
                        element:<AddTasks /> 
                    },
                    {
                        path:'add-task',
                        element:<AddTasks /> 
                    }
                ]
            },
            {
                index: true,
                element: <Login />,
            },
        ]
    }
]);