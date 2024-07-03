import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./templates/dashboard/Dashboard";
import Login from "./templates/login/Login";

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
            },
            {
                index: true,
                element: <Login />,
            },
        ]
    }
]);