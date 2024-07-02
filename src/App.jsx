import { useState } from 'react'
import { Outlet } from 'react-router-dom'
 
export default function App() {

  return (
    <>
     <div className="w-full h-screen bg-black flex justify-center items-center">
        <Outlet />
     </div>
    </>
  )
}

