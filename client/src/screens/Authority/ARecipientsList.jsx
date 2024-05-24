import React, { useEffect, useState } from 'react'
import { apiHelper } from '../../utils/apiHandler';

const ARecipientsList = () => {
 

  const [arecipients,setRecipient] = useState([]);

  
  useEffect(() => {

    async function fetchData() {
      // You can await here
      await apiHelper.get("api/authority/allrecipients")
        .then((res) => {
          setRecipient(res.data);

        }).catch((err) => {
          toast.error("Error for Fetching Data")
        })
  
      // ...
    }
    fetchData();
  }, []);

  return (
    <>

      <section className='px-[100px]  overflow-auto transform transition-all  py-4 pb-8 h-[90vh] flex flex-col '>
        <h1 className='text-2xl font-bold mb-6'>Recipients List</h1>

        <div className="relative w-full overflow-x-auto ">
          <table className="w-full border-2 text-sm text-left rtl:text-right text-gray-500 rounded-lg">
            <thead className="text-md w-full  text-white uppercase bg-c_blue">
              <tr>
                <th scope='col' className="px-6 py-4 whitespace-nowrap">Id</th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap ">
                  Name
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap  ">
                  Email Address
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap " >
                  Phone
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap" >
                  City
                </th>

                <th scope="col" className="px-6 py-4 whitespace-nowrap ">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {
                arecipients.map((items, index) => {
                  return (

                    <tr key={index}>
                       <th className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{index + 1}</th>
                      <th className="px-6 py-4 whitespace-nowrap font-semibold capitalize text-gray-800">{items.name}</th>
                      <td className="px-6 py-4 whitespace-nowrap text-sm  lowercase text-gray-800">{items.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{items.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{items.city}</td>
                      <td className={` ${(items.status == 'approved')? "text-green-700" : 'text-red-500'} capitalize font-semibold px-6 py-4 whitespace-nowrap text-sm`}>{items.status}</td>
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

export default ARecipientsList