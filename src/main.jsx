import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes.jsx'
import { SupabaseProvider } from './context/SupaClient.jsx'
import { TaskProvider } from './context/TaskContext.jsx'
import { EditTaskProvider } from './context/EditTaskContext.jsx'
import { TableTaskProvider } from './context/AddTasksContext.jsx'
import { TableHeaderandTaskProvider } from './context/FetchTableHeaderContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SupabaseProvider>
      <TableHeaderandTaskProvider>
        <TaskProvider>
          <EditTaskProvider>
            <TableTaskProvider>
              <RouterProvider router={routes} />
            </TableTaskProvider>
          </EditTaskProvider>
        </TaskProvider>
      </TableHeaderandTaskProvider>
    </SupabaseProvider>
  </React.StrictMode>,
)