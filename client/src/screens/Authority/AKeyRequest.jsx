import { Check, Key, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { apiHelper } from '../../utils/apiHandler';
import toast from 'react-hot-toast';

const AKeyRequest = () => {
  const [keyReq, setKeyReq] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    await apiHelper.get("api/authority/keyReq")
      .then((res) => {
        setKeyReq(res.data);
      }).catch((err) => {
        toast.error("Error for Fetching Data")
      })
  }

  const handleSendkey = async (value, id) => {

    await apiHelper.put("/api/authority/sendKey", {
      value: value,
      id:id,
    }).then((res) => {
    
      if (value == 'approved')
        toast.success("File Share Approved!");
      else
        toast.error("File Share Rejected!");
    }).catch((err) => {
        console.log(err)
      toast.error("Error for Fetching Data")
    })
    fetchData();
  }

  return (
    <>

      <section className='px-[100px]  overflow-auto transform transition-all  py-4 pb-8 h-[90vh] flex flex-col '>
        <h1 className='text-2xl font-bold mb-6'>File Share Request</h1>

        <div className="relative w-full overflow-x-auto ">
          <table className="w-full border-2 text-sm text-left rtl:text-right text-gray-500 rounded-lg">
            <thead className="text-md w-full  text-white uppercase bg-c_blue">
              <tr>
                <th scope='col' className="px-6 py-4 whitespace-nowrap">Id</th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap ">
                  File Name
                </th>
                <th scope="col" className="text-center px-6 py-4 whitespace-nowrap ">
                  Receiver Name
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap  ">
                  Hash Value
                </th>
               

                <th scope="col" className="text-center px-6 py-4 whitespace-nowrap ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {
                keyReq.map((items, index) => {

                  return (

                    <tr key={index}>
                      <th className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{index + 1}</th>
                      <th className="px-6 py-4 whitespace-nowrap font-semibold  text-gray-800">{items?.file_data?.originalname}</th>
                     
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center capitalize font-bold text-black">{items?.users?.name}</td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{items?.file_data?.hashvalue}</td>
                      <td className='py-3 flex h-full items-center justify-center gap-2 px-6'>
                        
                        <button onClick={() => handleSendkey("approved", items._id)} className='text-white flex bg-green-600  px-3 py-1.5 rounded-md items-center font-semibold hover:bg-green-700 text-md gap-2 justify-center'>{"Send"}<Key size={18} /></button>
                      </td>
                    </tr>

                  );
                })
              }
            </tbody>
          </table>
        </div>

      </section>
    </>
  )
}

export default AKeyRequest