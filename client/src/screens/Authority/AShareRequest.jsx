import { Check, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { apiHelper } from '../../utils/apiHandler';
import toast from 'react-hot-toast';

const AShareRequest = () => {
  const [olist, setOwnerList] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    await apiHelper.get("/api/authority/pendingsharerequest")
      .then((res) => {
        setOwnerList(res.data);
      }).catch((err) => {
        toast.error("Error for Fetching Data")
      })
  }

  const handleUpdate = async (value, id) => {

    await apiHelper.put("/api/authority/shareApprove", {
      value: value,
      file_id:id,
    }).then((res) => {
      fetchData();
      if (value == 'approved')
        toast.success("File Share Approved!");
      else
        toast.error("File Share Rejected!");
    }).catch((err) => {
      toast.error("Error for Fetching Data")
    })
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
                  Access Policy
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap  ">
                  Sender
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap " >
                  Receiver
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap" >
                  Hash Value
                </th>

                <th scope="col" className="text-center px-6 py-4 whitespace-nowrap ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {
                olist.map((items, index) => {

                  return (

                    <tr key={index}>
                      <th className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{index + 1}</th>
                      <th className="px-6 py-4 whitespace-nowrap font-semibold  text-gray-800">{items.file_data.originalname}</th>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center capitalize font-semibold text-gray-800">{items.file_data.access_policy}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm capitalize font-bold text-black ">{items.sender.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm  capitalize font-bold text-black">{items.receiver.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{items.file_data.hashvalue}</td>
                      <td className='py-3 flex h-full items-center justify-center gap-2 px-6'>
                        <button onClick={() => handleUpdate("approved", items._id)} className='text-white  bg-green-600 p-1 rounded-md'><Check /></button>
                        <button onClick={() => handleUpdate("rejected", items._id)} className='text-white  bg-red-600 p-1 rounded-md'><X /></button>
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

export default AShareRequest