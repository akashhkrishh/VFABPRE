import React from 'react'
import { Banner, DataOwner, Recipients } from '../assets/images'
import { Navigate, useNavigate, } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';


const HomeScreen = () => {
    const title = "A Verifiable and Fair Attribute-Based Proxy Re-Encryption Scheme for Data Sharing in Clouds";
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    };
    return (
        <section className='px-[100px] overflow-auto transform transition-all  py-4 pb-8 h-[90vh]'>
            <div className='w-full h-full flex gap-4 '>
                <div className='w-1/2 flex items-center justify-center flex-col transition-all transform shadow-lg bg-white rounded-lg h-full'>
                    <span className='px-8 text-xl font-medium overflow-auto text-center'>{title}</span>
                    <img src={Banner} className='h-[80%]' alt="" />

                </div>
                <div className='w-1/2 flex gap-4 flex-col h-full '>
                    <div className="h-1/2 flex gap-4 w-full ">


                        <div onClick={() => handleClick("/dataowner")} className="w-1/2 shadow-lg h-full bg-white hover:scale-102 rounded-lg">
                            <div style={{ backgroundImage: 'url(".././src/assets/images/DataOwner.svg")' }} className='rounded-lg p-4 bg-cover bg-center h-[100%]  overflow-hidden w-full'>
                                <h1 className='flex gap-2 justify-end w-full'><span className='font-semibold'>Data Owner</span> <ExternalLink size={20} /></h1>

                            </div>
                        </div>

                        <div onClick={() => handleClick("/recipient")} className="w-1/2 shadow-lg h-full bg-white hover:scale-102 rounded-lg">
                            <div style={{ backgroundImage: 'url(".././src/assets/images/Recipients-1.svg")' }} className='rounded-lg p-4 bg-cover bg-center h-[100%]  overflow-hidden w-full'>
                                <h1 className='flex gap-2 justify-end w-full'><span className='font-semibold'>Recipient</span> <ExternalLink size={20} /></h1>

                            </div>
                        </div>






                    </div>

                    <div className="h-1/2 flex gap-4 w-full ">


                        <div onClick={() => handleClick("/authority")} className="w-1/2 shadow-lg h-full bg-white hover:scale-102 rounded-lg">
                            <div style={{ backgroundImage: 'url(".././src/assets/images/Authority.svg")' }} className='rounded-lg p-4 bg-cover bg-center h-[100%]  overflow-hidden w-full'>
                                <h1 className='flex gap-2 justify-end w-full'><span className='font-semibold'>Authority Center</span> <ExternalLink size={20} /></h1>

                            </div>
                        </div>

                        <div onClick={() => handleClick("/cloud")} className="w-1/2 shadow-lg h-full bg-white hover:scale-102 rounded-lg">
                            <div style={{ backgroundImage: 'url(".././src/assets/images/Cloud.svg")' }} className='rounded-lg p-4 bg-cover bg-center h-[100%]  overflow-hidden w-full'>
                                <h1 className='flex gap-2 justify-end w-full'><span className='font-semibold'>Cloud Server</span> <ExternalLink size={20} /></h1>

                            </div>
                        </div>






                    </div>
                </div>


            </div>

        </section >
    )
}

export default HomeScreen