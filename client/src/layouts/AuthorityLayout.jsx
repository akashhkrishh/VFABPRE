import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthorityNavbar from '../components/AuthorityNavbar'

const AuthorityLayout = () => {
  return (
    <div className='min-h-[100vh] fixed w-screen bg-primary'>
        <AuthorityNavbar/>
        <Outlet/>
    </div>
  )
}

export default AuthorityLayout