import { Check, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { apiHelper } from '../../utils/apiHandler';

const RActivation = () => {
  const [rlist, setRecipientList] = useState([]);

  useEffect(() => {

    fetchData();
  }, [])

  const fetchData = async () => {
    await apiHelper.get("/api/authority/pendingrecipientlist")
      .then((res) => {
        setRecipientList(res.data);
      }).catch((err) => {
        toast.error("Error for Fetching Data")
      })
  }

  const handleUpdate = async (value, email) => {

    await apiHelper.put("/api/authority/isApprove", {
      value: value,
      email: email,
    }).then((res) => {
      fetchData();
      if (value == 'approved')
        toast.success("Owner Activation Successful!");
      else
        toast.error("Owner Rejected!");
    }).catch((err) => {
      toast.error("Error for Fetching Data")
    })
  }


  return (
    <>

      <section className='px-[100px]  overflow-auto transform transition-all  py-4 pb-8 h-[90vh] flex flex-col '>
        <h1 className='text-2xl font-bold mb-6'>Recipient Activation Request</h1>

        <div className="relative w-full overflow-x-auto ">
          <table className="w-full border-2 text-sm text-left rtl:text-right text-gray-500 rounded-lg">
            <thead className="text-md w-full  text-white uppercase bg-c_blue">
              <tr>
                <th scope='col' class="px-6 py-4 whitespace-nowrap">Id</th>
                <th scope="col" class="px-6 py-4 whitespace-nowrap ">
                  Name
                </th>
                <th scope="col" class="px-6 py-4 whitespace-nowrap  ">
                  Email Address
                </th>
                <th scope="col" class="px-6 py-4 whitespace-nowrap " >
                  Phone
                </th>
                <th scope="col" class="px-6 py-4 whitespace-nowrap" >
                  City
                </th>

                <th scope="col" class="text-center px-6 py-4 whitespace-nowrap ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {
                rlist.map((items, index) => {
                  return (

                    <tr className='' key={index}>
                      <th className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{index + 1}</th>
                      <th className="px-6 py-4 whitespace-nowrap font-semibold capitalize text-gray-800">{items.name}</th>
                      <td className="px-6 py-4 whitespace-nowrap text-sm  lowercase text-gray-800">{items.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{items.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{items.city}</td>
                      <td className='py-3 flex h-full items-center justify-center gap-2 px-6'>
                        <button onClick={() => handleUpdate("approved", items.email)} className='text-white  bg-green-600 p-1 rounded-md'><Check /></button>
                        <button onClick={() => handleUpdate("rejected", items.email)} className='text-white  bg-red-600 p-1 rounded-md'><X /></button>
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

export default RActivation