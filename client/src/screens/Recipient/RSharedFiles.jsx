import React, { useEffect, useState } from 'react'
import { apiHelper } from '../../utils/apiHandler';
import { convertIsoToNormalDateTime } from '../../constants/dateTime';
import { Check, Circle, CircleCheck, Key } from 'lucide-react';
import toast from 'react-hot-toast';

const RSharedFiles = () => {
  const [myfiles, setFiles] = useState([]);
  async function fetchData() {
    // You can await here
    await apiHelper.get("/api/recipient/rsharedfiles")
      .then((res) => {
        setFiles(res.data);

      }).catch((err) => {
        toast.error("Error for Fetching Data")
      })
  
  }
  {console.log(JSON.stringify(myfiles))}
  useEffect(() => {
    
    fetchData();
  }, []);

  const handleGetKey = async(fileId,Id) =>{
    
    await apiHelper.post("/api/recipient/getKey",{
        file_id:fileId._id,
        sid:Id
    }).then((res)=>{
        toast.success("Key Request Send!")
        fetchData();
    }).catch((err)=>{
        toast.error("Key Request Failed!")
    })
    
  }


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
                      <th scope="col" className="p-4 text-start text-xs font-medium   uppercase">Owner Name</th>
                      <th scope="col" className="p-4 text-start text-xs font-medium  uppercase">Owner Email</th>
                      <th scope="col" className="p-4 text-start text-xs font-medium  uppercase">Sender  Name</th>
                      <th scope="col" className="p-4 text-start text-xs font-medium  uppercase">Sender Email</th>
                      {/* <th scope="col" className="p-4 text-start text-xs font-medium  uppercase">Hash Value</th> */}
                      <th scope="col" className="p-4 text-start text-xs font-medium uppercase">Shared Time</th>
                      <th scope="col" className="p-4 text-xs text-center font-medium  uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                  
                    {
                    
                      myfiles.map((items,index)=>{
                        return(
                          <tr key={index} className="hover:bg-gray-100">
                          <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-800">{index+1}</td>
                          <td className="p-4 whitespace-nowrap font-semibold text-sm text-gray-800">{items?.file_data?.originalname}</td>
                          <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-800">{items.owner.name}</td>
                          <td className="p-4 whitespace-nowrap text-sm text-gray-800">{items.owner.email}</td>
                          <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-800">{items.sender.name}</td>
                          <td className="p-4 whitespace-nowrap text-sm text-gray-800">{items.sender.email}</td>
                          {/* <td className="p-4 whitespace-nowrap text-sm text-gray-800">{items.file_data.hashvalue}</td> */}
                          {/* <td className={` ${items.status == "approved" ?"text-green-600" :"text-yellow-600"} p-4 whitespace-nowrap text-sm capitalize font-semibold text-gray-800 `}>{items.status}</td> */}
                          <td className="p-4 whitespace-nowrap text-sm text-gray-800">{convertIsoToNormalDateTime(items.createdAt)}</td>
                          <td className='py-3 flex h-full items-center justify-center gap-1 px-6'>
                        {
                            items.isSend ? <label className='bg-slate-200 text-green-600 flex items-center justify-center gap-2 text-sm p-2 px-4 rounded-md font-semibold'><Check size={18} />Sent</label>:
                         
                        <button onClick={()=>handleGetKey(items.file_data,items._id)} className='text-white flex bg-green-600  px-2 py-1 rounded-md items-center font-semibold hover:bg-green-700 text-sm gap-2 justify-center'>{"Get"}<Key size={16} /></button>}
                      </td>
                         
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

export default RSharedFiles