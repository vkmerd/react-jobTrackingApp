import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./templates/dashboard/Dashboard";
import Login from "./templates/login/Login";
import Tasks from "./templates/dashboard/pages/Tasks";

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
                        path: 'tasks',
                        element: <Tasks />
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