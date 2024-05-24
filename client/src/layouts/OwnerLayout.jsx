import React from 'react'
import { Outlet } from 'react-router-dom'
import DataOwnerNavbar from '../components/DataOwnerNavbar'


const DataOwnerLayout = () => {
  return (
    <div className='min-h-[100vh] fixed w-screen bg-primary'>
        <DataOwnerNavbar/>
        <Outlet/>
    </div>
  )
}

export default DataOwnerLayout