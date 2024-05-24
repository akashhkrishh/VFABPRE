import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthorityNavbar from '../components/AuthorityNavbar'
import { RecipientNavbar } from '../components'

const RecipientLayout = () => {
  return (
    <div className='min-h-[100vh] fixed w-screen bg-primary'>
        <RecipientNavbar/>
        <Outlet/>
    </div>
  )
}

export default RecipientLayout