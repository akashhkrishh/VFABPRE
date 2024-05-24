import React, { useEffect, useState } from 'react'
import { apiHelper } from '../../utils/apiHandler';

const AOwnersList = () => {
  const [olist, setOwnerList] = useState([]);

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async() =>{
    await apiHelper.get("/api/authority/allowners")
    .then((res)=>{
      setOwnerList(res.data);
    }).catch((err)=>{
      toast.error("Error for Fetching Data")
    })
  }

  return (
    <>

      <section className='px-[100px]  overflow-auto transform transition-all  py-4 pb-8 h-[90vh] flex flex-col '>
        <h1 className='text-2xl font-bold mb-6'>Owner List</h1>

        <div className="relative w-full overflow-x-auto rounded-lg ">
          <table className="w-full border-2 text-sm text-left rtl:text-right text-gray-500 rounded-lg">
            <thead className="text-sm w-full rounded-lg  text-white uppercase bg-c_blue">
              <tr>
                <th scope='col' className="p-4 whitespace-nowrap">Id</th>
                <th scope="col" className="p-4 whitespace-nowrap ">
                  Name
                </th>
                <th scope="col" className="p-4 whitespace-nowrap  ">
                  Email Address
                </th>
                <th scope="col" className="p-4 whitespace-nowrap " >
                  Phone
                </th>
                <th scope="col" className="p-4 whitespace-nowrap" >
                  City
                </th>

                <th scope="col" className="p-4 whitespace-nowrap ">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {
                olist.map((items, index) => {
                  return (

                    <tr key={index}>
                      <th className="p-4 whitespace-nowrap text-sm font-medium text-gray-800">{index + 1}</th>
                      <th className="p-4 whitespace-nowrap font-semibold capitalize text-gray-800">{items.name}</th>
                      <td className="p-4 whitespace-nowrap text-sm  lowercase text-gray-800">{items.email}</td>
                      <td className="p-4 whitespace-nowrap text-sm text-gray-800">{items.phone}</td>
                      <td className="p-4 whitespace-nowrap text-sm text-gray-800">{items.city}</td>
                      <td className={` ${(items.status == 'approved') ? "text-green-700" : 'text-red-500'} capitalize font-semibold px-4 whitespace-nowrap text-sm`}>{items.status}</td>
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

export default AOwnersList