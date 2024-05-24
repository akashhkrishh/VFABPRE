import React from 'react';
import { HomeNavList } from '../constants/NavList';
import { Logo } from "../assets/images"
import { NavLink } from 'react-router-dom';
const NavBar = () => {
    return (
        <nav className='flex justify-between items-center h-[10vh] px-[100px]'>
            <div className='h-full items-center gap-2 text-xl font-semibold flex  py-6'>
                <img className='h-full' src={Logo} alt="" />
                <h1>VF-ABPRE</h1>
            </div>
            <ul className='h-full flex items-center gap-6'>

                {
                    HomeNavList.map((items, key) => {
                        return (<li  key={key}><NavLink className="py-2 text-c_black font-semibold transform transition-all ease-in-out" to={items.path}>{items.title}</NavLink></li>);
                    })
                }
            </ul>
        </nav>
    )
}

export default NavBar