import React, { useEffect, useState } from 'react';
import { AuthorityNavList, HomeNavList, RecipientNavList } from '../constants/NavList';
import { Logo } from "../assets/images"
import { NavLink, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { apiHelper } from '../utils/apiHandler';
const RecipientNavbar = () => {

    const [uName,setName] = useState();

    useEffect(() => {
        async function fetchData() {
          // You can await here
          await apiHelper.get("api/recipient/").then((res)=>{setName(res.data)}).catch((err)=>{
            toast.error(err);
        })
          // ...
        }
        fetchData();
      }, []);
    const navigate = useNavigate();
    const handleLogout = () =>{
        localStorage.clear();
        navigate('/');
      }
    return (
        <nav className='flex justify-between items-center h-[10vh] px-[100px]'>
            <div className='h-full items-center gap-2 text-xl font-semibold flex  py-6'>
                <img className='h-full' src={Logo} alt="" />
                <h1>Recipient</h1>
            </div>
            <ul className='h-full flex items-center gap-6'>

                {
                    RecipientNavList.map((items, key) => {
                        return (<li  key={key}><NavLink className="py-2 text-c_black font-semibold transform transition-all ease-in-out" to={items.path}>{items.title}</NavLink></li>);
                    })
                }
                
            </ul>
            <div className='flex items-center justify-center gap-2'>
                <div className='font-bold py-1.5 px-3 rounded-lg  bg-white text-c_blue gap-1 flex items-center justify-end' >
                    <User size={18}/>
                <label className=' capitalize' >{uName}</label>
                </div>
            <button onClick={handleLogout} className=' hover:bg-blue-600 bg-c_blue py-1.5 px-3 rounded-lg font-semibold text-white'>Logout</button>
            </div>
        </nav>
    )
}

export default RecipientNavbar