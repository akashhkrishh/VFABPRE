import React from 'react';
import { PageNotFound } from '../assets/images';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className='h-[90vh]  flex flex-col items-center justify-center'>
        <img className='h-[70%] -z-10 scale-125' src={PageNotFound} alt="" />
        <NavLink className="underline text-c_blue font-bold" to={"/"}>Go to Home</NavLink>
    </div>
  )
}

export default Dashboard