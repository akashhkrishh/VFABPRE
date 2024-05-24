import React, { useState } from 'react'
import {  Recipients_1 } from '../../assets/images';
import DOLoginForm from './RLoginForm';
import DOSignupForm from './RSignupForm';

const RecipientScreen = () => {
  const [isLogin,setLogin] = useState(true);
  return (
    <section className='px-[100px] w-screen overflow-auto transform gap-4 transition-all py-4 pb-8 h-[90vh] flex items-center justify-center'>
      <div className="w-2/3 rounded-lg shadow-lg flex items-center justify-center bg-white h-full">
        <img className='h-full' src={Recipients_1} alt="" />
      </div>
      <div className="w-1/3 rounded-lg shadow-lg bg-white h-full p-8 transition-all transform ease-linear'">
        <div className='flex w-full font-medium gap-2 transition-all transform ease-linear'>
          <button onClick={()=>setLogin(!isLogin)} className={`${ isLogin ? 'bg-c_blue text-white':'bg-primary text-c_black' }  w-1/2 py-3 rounded-lg transition-all transform ease-linear' `}>Login</button>
          <button onClick={()=>setLogin(!isLogin)}  className={`${ !isLogin ? 'bg-c_blue text-white':'bg-primary text-c_black' }  w-1/2 py-3 rounded-lg  transition-all transform ease-linear'`}>Sign up</button>
        </div>
        {
          isLogin ?
          <DOLoginForm/>: <DOSignupForm />
        }

      </div>
    </section>
    
  )
}

export default RecipientScreen;