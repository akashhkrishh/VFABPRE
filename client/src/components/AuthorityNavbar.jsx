import React from 'react';
import { AuthorityNavList, HomeNavList } from '../constants/NavList';
import { Logo } from "../assets/images"
import { NavLink, useNavigate } from 'react-router-dom';
const AuthorityNavbar = () => {
    const navigate = useNavigate();
    const handleLogout = () =>{
        localStorage.clear();
        navigate('/');
      }
    return (
        <nav className='flex justify-between items-center h-[10vh] px-[100px]'>
            <div className='h-full items-center gap-2 text-xl font-semibold flex  py-6'>
                <img className='h-full' src={Logo} alt="" />
                <h1>Authority</h1>
            </div>
            <ul className='h-full flex items-center gap-6'>

                {
                    AuthorityNavList.map((items, key) => {
                        return (<li  key={key}><NavLink className="py-2 text-c_black font-semibold transform transition-all ease-in-out" to={items.path}>{items.title}</NavLink></li>);
                    })
                }
                
            </ul>
            <button onClick={handleLogout} className=' hover:bg-blue-600 bg-c_blue py-2 px-4 rounded-lg font-semibold text-white'>Logout</button>
        </nav>
    )
}

export default AuthorityNavbar