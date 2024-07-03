import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes.jsx'
import { SupabaseProvider } from './SupaClient.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SupabaseProvider>
      <RouterProvider router={routes} />
    </SupabaseProvider>
  </React.StrictMode>,
)