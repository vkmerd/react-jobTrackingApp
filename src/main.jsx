import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes.jsx'
import { SupabaseProvider } from './SupaClient.jsx'
import { TaskProvider } from './TaskContext.jsx'
import { EditTaskProvider } from './EditTaskContext.jsx'
import { TableTaskProvider } from './AddTasksContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SupabaseProvider>
      <TaskProvider>
        <EditTaskProvider>
          <TableTaskProvider>
            <RouterProvider router={routes} />
          </TableTaskProvider>
        </EditTaskProvider>
      </TaskProvider>
    </SupabaseProvider>
  </React.StrictMode>,
)