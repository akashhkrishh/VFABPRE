import React, { useEffect, useState } from 'react'
import { apiHelper } from '../../utils/apiHandler';
import { convertIsoToNormalDateTime } from '../../constants/dateTime';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RFileTransactions = () => {
  const [myfiles, setFiles] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      // You can await here
      await apiHelper.get("/api/recipient/mysharefiles")
        .then((res) => {
          setFiles(res.data);
            

        }).catch((err) => {
          toast.error("Error for Fetching Data")
        })
    
    }
    fetchData();
  }, []);

  return (
    <section className='px-[100px]  overflow-auto transform transition-all  py-4 pb-8 h-[90vh] flex items-center justify-center'>
      <div className="w-full  bg-white rounded-lg flex flex-col shadow-lg p-4 h-full">
        <div className="flex flex-col ">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className='bg-c_blue text-white'>
                    <tr>
                      <th scope="col" className="p-4 text-start text-xs font-medium  uppercase">Id</th>
                      <th scope="col" className="p-4 text-start text-xs font-medium   uppercase">File Name</th>
                      <th scope="col" className="p-4 text-start text-xs font-medium  uppercase">Owner  </th>
                      <th scope="col" className="p-4 text-start text-xs font-medium  uppercase">Recipient </th>
                      <th scope="col" className="p-4 text-start text-xs font-medium  uppercase">Hash Value</th>
                      <th scope="col" className="p-4 text-start text-xs font-medium  uppercase">Status</th>
                      <th scope="col" className="p-4 text-start text-xs font-medium uppercase">Shared Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                  
                    {
                    
                      myfiles.map((items,index)=>{
                        return(
                          <tr className="hover:bg-gray-100">
                          <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-800">{index+1}</td>
                          <td className="p-4 whitespace-nowrap font-semibold text-sm text-gray-800">{items?.file_data?.originalname}</td>
                          <td className="p-4 whitespace-nowrap text-sm text-gray-800">{items?.owner?.name}</td>
                          <td className="p-4 whitespace-nowrap text-sm text-gray-800">{items?.receiver?.email}</td>
                          <td className="p-4 whitespace-nowrap text-sm text-gray-800">{items?.file_data?.hashvalue}</td>
                          <td className={` ${items.status == "approved" ?"text-green-600" :"text-yellow-600"} p-4 whitespace-nowrap text-sm capitalize font-semibold text-gray-800 `}>{items.status}</td>
                          <td className="p-4 whitespace-nowrap text-sm text-gray-800">{convertIsoToNormalDateTime(items.createdAt)}</td>
                         
                        </tr>
                        )
                      })
                    }
                   
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div></section>
  )
}

export default RFileTransactions