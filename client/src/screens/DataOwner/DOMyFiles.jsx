import { Check, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { apiHelper } from '../../utils/apiHandler';
import { convertIsoToNormalDateTime } from '../../constants/dateTime';
import ReactModal from 'react-modal';

const DOMyFiles = () => {
   
  const [myfile, setFiles] = useState([]);
  const [fileContent, setFileContent] = useState();
  const [isOpen,setOpen]  = useState(false);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await apiHelper.get("/api/owner/myfiles")
      .then((res) => {
        setFiles(res.data);
      
      }).catch((err) => {
        toast.error("Error for Fetching Data")
      })
      // ...
    }
    fetchData();
  }, []);

  const fetchFileContent = async(file_path) =>{
    
    
    
    await apiHelper.post("/api/owner/filecontent",{"file_path":file_path},
     
    ).then((res)=>{
      setFileContent(res.data);
      setOpen(true);
    }).catch((err)=>{
      console.log(err);
    })
 
  }
  
  
 
  
  return (
    <>
    <section className='px-[100px]  overflow-auto transform transition-all  py-4 pb-8 h-[90vh] flex flex-col '>
    <h1 className='text-2xl font-bold mb-6'>My Files</h1>

    <div className="relative w-full overflow-x-auto ">
      <table className="w-full border-2 text-sm text-left rtl:text-right text-gray-500 rounded-lg">
        <thead className="text-md w-full  text-white uppercase bg-c_blue">
          <tr>
            <th scope='col' className="px-6 py-4 whitespace-nowrap">Id</th>
            <th scope="col" className="px-6 py-4 whitespace-nowrap ">
              File Name
            </th>
            <th scope="col" className="px-6 py-4 whitespace-nowrap  ">
              Hash Value
            </th>
            <th scope="col" className="px-6 py-4 whitespace-nowrap " >
              Access Policy
            </th>
            <th scope="col" className="px-6 py-4 whitespace-nowrap" >
              Upload Time
            </th>

       
          </tr>
        </thead>
        <tbody className='w-full'>
          {
            myfile.map((items, index) => {
              return (

                <tr className=' cursor-pointer hover:bg-blue-100'  onClick={
                  ()=>{
                  
                    fetchFileContent(items.file_path);
                  }
                }  key={index}>
                  <th className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{index + 1}</th>
                  <th className="px-6 py-4 whitespace-nowrap font-semibold  text-gray-800">{items.originalname}</th>
                  <td className="px-6 py-4 whitespace-nowrap text-sm  uppercase text-gray-800">{items.hashvalue}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold capitalize text-gray-800">{items.access_policy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{convertIsoToNormalDateTime(items.createdAt)}</td>
                
                </tr>

              );
            })
          }


        </tbody>
      </table>
    </div>

  </section>
  <ReactModal
        isOpen={isOpen}
        onRequestClose={()=>setOpen(false)}
        
        style={{
          content: {
            padding:"0px",
            width: '40%', // Set the width of the modal
            height: '50%', // Set the height of the modal
            top: '50%', // Center the modal vertically
            left: '50%', // Center the modal horizontally
            transform: 'translate(-50%, -50%)', // Translate the modal to center it
          },}
        }
      >
        <div className='h-full w-full overflow-auto'>
          <div className='h-12 w-full bg-c_blue flex items-center fixed justify-end p-2'>
            <X onClick={()=>{
              setOpen(false);
            }} className='text-white cursor-pointer'/>
          </div>
          <div>
      
            <p className=' p-2 mt-12 break-words overflow-auto '>{fileContent}</p>
          </div>
          
        </div>
      </ReactModal>
  </>
  )
}

export default DOMyFiles