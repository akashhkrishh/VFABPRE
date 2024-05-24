import { Check, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { convertIsoToNormalDateTime } from '../../constants/dateTime';
import { apiHelper } from '../../utils/apiHandler';

const CUploadedFiles = () => {
   
  const [allfiles, setFiles] = useState([])

      
  useEffect(() => {
    async function fetchData() {
      // You can await here
      await apiHelper.get("/api/cloud/allfiles")
      .then((res) => {
        setFiles(res.data);
      
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
            <h1 className='text-2xl font-bold mb-6'>File Sharing Request</h1>
    
            <div className="relative bg-white rounded-lg shadow-lg h-full w-full overflow-x-auto ">
              <table className="w-full  text-sm text-left rtl:text-right text-gray-500 rounded-lg">
                <thead className="text-md w-full   text-white uppercase bg-c_blue">
                  <tr>
                    <th scope='col' className="px-6 py-4 whitespace-nowrap">Id</th>
                    <th scope='col' className="px-6 py-4 whitespace-nowrap">Owner</th>

                    <th scope="col" className="px-6 py-4 whitespace-nowrap " >
                      File Name
                    </th>
                    <th scope="col" className="px-6 py-4 whitespace-nowrap" >
                      Access Policy
                    </th>
                    
                    <th scope="col" className="px-6 py-4 whitespace-nowrap" >
                      Hash Value
                    </th>
                    <th scope="col" className="px-6 py-4 whitespace-nowrap" >
                      Uploaded Time
                    </th>
    
                  </tr>
                </thead>
                <tbody className='w-full '>
                
                  {
                    
                    allfiles.map((items, index) => {
                      return (
    
                        <tr key={index}>
                           <th className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{index + 1}</th>
                           <th className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{items.owner.name}</th>
                           {/* <th className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{items.sender.name}</th> */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{items.originalname}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-800">{items.access_policy}</td>
                          <td className="px-6 py-4  whitespace-nowrap text-sm uppercase text-gray-800">{items.hashvalue}</td>
                          <td className="px-6 py-4  whitespace-nowrap text-sm uppercase text-gray-800">{convertIsoToNormalDateTime(items.createdAt)}</td>
                          
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

export default CUploadedFiles