import React, { useEffect, useState } from 'react'
import { apiHelper } from '../../utils/apiHandler';
import { Share } from '../../assets/images';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RShareFiles = () => {
  
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    filename: "",
    receiverId: "",
    fileId: "",
  });
  const [fileIndex, setFileIndex] = useState(null);
  const [rIndex, setRIndex] = useState(null);
  const [ofiles, setOFiles] = useState([]);
  const [rfiles, setRFiles] = useState([]);
  const [myfiles, setFiles] = useState([]);

  const handleFileInput = (value, filename, index) => {

    setFormData({
      ...formData,
      ['filename']: filename,
      ['fileId']: value
    });
    setFileIndex(index);
  };

  const handleRecipientInput = (value, email, index) => {

    setFormData({
      ...formData,
      ['email']: email,
      ['receiverId']: value
    });

    setRIndex(index)

  };


  useEffect(() => {
    async function fetchData() {
      // You can await here
      await apiHelper.get("/api/recipient/osharedfiles")
      .then((res) => {
          setOFiles(res.data);
          setFiles(res.data)

      }).catch((err) => {
          toast.error("Error for Fetching Data")
      })
  await apiHelper.get("/api/recipient/rsharedfiles")
      .then((res) => {
          setRFiles(res.data);

      }).catch((err) => {
          toast.error("Error for Fetching Data")
      })
      await apiHelper.get("/api/recipient/allrecipients")
        .then((res) => {
          setRecipient(res.data);

        }).catch((err) => {
          toast.error("Error for Fetching Data")
        })


      // ...
    }
    fetchData();
  }, []);


  const handleSubmit = async() =>{

    console.log(JSON.stringify(formData))
    if(formData.fileId == "" || formData.filename == ""){
      toast.error("Select the File");
      return
    }
    if(formData.email == "" || formData.receiverId == ""){
      toast.error("Select the Recipient");
      return
    }

    await apiHelper.post("api/recipient/reshare",{
      "file_id":formData.fileId,
      "receiver":formData.receiverId,
    }).then((res)=>{
      toast.success("Proxy Re-Encryption Done!");
      navigate("/dashboard/recipient/filetrans")
    }).catch((err)=>{
      toast.error(err.response.data.message);
      navigate("/dashboard/recipient/filetrans")
    })
  

  }
  const [isToggled, setIsToggled] = useState(true);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setFileIndex(null)
        setFormData({
            ...formData,
            ['filename']: '',
            ['fileId']: ''
        });
    if(!isToggled){
        setFiles(ofiles)
    }else{
        setFiles(rfiles)
    }
};

  return (
    <section className='px-[100px]  overflow-auto transform transition-all gap-4  py-4 pb-8 h-[90vh] flex items-center justify-center'>
      <div className="w-1/3 gap-4 bg-white rounded-lg flex flex-col  shadow-lg p-4 h-full">
     
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
              <div className='w-full pb-4 flex gap-2 items-center '>
                                    
                                    <button
                                        onClick={handleToggle}
                                        className={`w-12 p-1 h-6 rounded-full ${isToggled ? 'bg-green-500' : 'bg-gray-300'
                                            } focus:outline-none`}
                                    >
                                        <span
                                            className={`block w-4 h-4 rounded-full transform transition-transform ${isToggled ? 'translate-x-6' : ''
                                                } bg-white shadow-md`}
                                        ></span>
                                    </button>
                                    <span className='transform transition-transform text-xl font-bold'>{ isToggled ? "Owner":"Recipient" }{" Shared Files"}</span>
                                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className='bg-c_blue text-white'>
                    <tr>
                      <th scope="col" className="px-6 py-4 text-start text-xs font-medium uppercase">Id</th>
                      <th scope="col" className="px-6 py-4 text-start text-xs font-medium  uppercase">File Name</th>
                      <th scope="col" className="px-6 py-4 text-start text-xs font-medium  uppercase">{ isToggled ? "Owner":"Sender" }</th>
                      <th scope="col" className="px-6 py-4 text-start text-xs font-medium uppercase">Access Policy</th>

                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {
                      myfiles.map((items, index) => {
                        return (
                          <tr
                            onClick={() =>
                              handleFileInput(items.file_data._id, items.file_data.originalname, index)
                            }
                            className={`cursor-pointer ${fileIndex == index ? "bg-blue-100" : ""} hover:bg-blue-100`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold  text-gray-800">{items?.file_data?.originalname}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{items.sender.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-800">{items?.file_data?.access_policy}</td>

                          </tr>
                        );
                      })
                    }



                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3  bg-white rounded-lg flex flex-col  gap-4 shadow-lg p-4 h-full">
        <h1 className='text-xl font-bold'>Recipient List</h1>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className='bg-c_blue text-white'>
                    <tr>
                      <th scope="col" className="px-6 py-4 text-start text-xs font-medium uppercase">Id</th>
                      <th scope="col" className="px-6 py-4 text-start text-xs font-medium  uppercase">Name</th>
                      <th scope="col" className="px-6 py-4 text-start text-xs font-medium uppercase">Email</th>

                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {
                      recipient.map((items, index) => {
                        return (
                          <tr key={index} className= {`cursor-pointer ${rIndex==index ?"bg-blue-100":""} hover:bg-blue-100`}  onClick={
                            () => {
      
                              handleRecipientInput(items._id,items.email,index);
                            }
                          } >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{index + 1}</td>
                            <td className="px-6 py-4 font-semibold whitespace-nowrap text-sm  capitalize text-gray-800">{items.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{items.email}</td>

                          </tr>
                        );
                      })
                    }



                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div className="w-1/3  bg-white rounded-lg flex flex-col  gap-4 shadow-lg p-4 h-full">
      <h1 className='text-xl font-bold'>Share Files</h1>
      <div className='w-full mt-4'>
        <img src={Share} alt="" />
      </div>
      <div className="flex flex-col w-full gap-2 ">
          <label className='font-semibold'>File name</label>
          <div className='h-14 rounded-lg flex items-center justify-center font-semibold text-center border w-full border-c_blue'>{formData.filename}</div>
        </div>
        <div className="flex flex-col w-full gap-2 ">
          <label className='font-semibold'>Recipient Email Address</label>
          <div className='h-14 rounded-lg flex items-center justify-center font-semibold text-center border w-full border-c_blue'>{formData.email}</div>
        </div>
        <button onClick={handleSubmit} className='bg-c_blue hover:bg-blue-600 w-full h-14 rounded-lg text-md text-white font-semibold'>Share File</button>
      </div>
    </section>


  )
}

export default RShareFiles