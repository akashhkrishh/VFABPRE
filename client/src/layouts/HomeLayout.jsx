import React from 'react'
import {NavBar}from '../components'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <div className='min-h-[100vh] fixed w-screen bg-primary'>
        <NavBar/>
        <Outlet/>
    </div>
  )
}

export default HomeLayout