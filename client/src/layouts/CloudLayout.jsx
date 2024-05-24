import React from 'react'
import { Outlet } from 'react-router-dom'
import { CloudNavbar } from '../components'


const CloudLayout = () => {
  return (
    <div className='min-h-[100vh] fixed w-screen bg-primary'>
        <CloudNavbar/>
        <Outlet/>
    </div>
  )
}

export default CloudLayout