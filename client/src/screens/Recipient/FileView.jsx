import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { apiHelper } from '../../utils/apiHandler';

const FileView = () => {
    const [ofiles, setOFiles] = useState([]);
    const [rfiles, setRFiles] = useState([]);
    const [myfiles, setFiles] = useState([]);
    const [isTrue, setTrue] = useState(true);
    const [fileContent, setContent] = useState(null);
    const [plaintext, setText] = useState(null);
    const [dform, setDform] = useState({
        secretkey: '',
        hashvalue: '',
    })
    const [formData, setFormData] = useState({
        filename: "",
        fileId: "",
    });
    const [fileIndex, setFileIndex] = useState(null);
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

    }
    useEffect(() => {

        fetchData();
    }, []);



    const handleFileInput = async (value, filename, index, file_path) => {
        setText(null)
        await apiHelper.post("api/recipient/filecontent", { "file_path": file_path }).then((res) => {
            setContent(res.data);

        }).catch((err) => {
            console.log(err)
            alert(err)
        })
        setFormData({
            ...formData,
            ['filename']: filename,
            ['fileId']: value
        });
        setFileIndex(index);
    };

    const inputChange = async (e) => {
        const { name, value } = e.target;
        setDform({
            ...dform,
            [name]: value,
        });
    }

    const handleSubmit = async () => {



        if (formData.fileId == '') {
            toast.error("Select the File ");
            return;
        }
        if (dform.secretkey == '') {
            toast.error("Invalid Secret Key");
            return;
        }
        if (dform.hashvalue == '') {
            toast.error("Invalid Hash Value");
            return;
        }

        await apiHelper.post("/api/recipient/decrypt", {
            "file_id": formData.fileId,
            "secretkey": dform.secretkey,
            "hashvalue": dform.hashvalue,
        }).then((res) => {
            setText(res.data);
            toast.success("Decryption Sucess!")
        }).catch((err) => {
            console.log(err);
            setText(null)
            toast.error(err.response.data.message);
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
    const downloadFile = () => {
        const element = document.createElement("a");
        const file = new Blob([plaintext.fileContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = plaintext.filename;
        document.body.appendChild(element); // Required for this to work in Firefox
        element.click();
    };

    return (
        <section className='px-[100px]  overflow-auto transform transition-all  py-4 pb-8 h-[90vh] flex items-center justify-center gap-4'>
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
                                                    <tr key={index}
                                                        onClick={() =>
                                                            handleFileInput(items.file_data._id, items.file_data.originalname, index, items.file_data.file_path)
                                                        }
                                                        className={`cursor-pointer ${fileIndex == index ? "bg-blue-100" : ""} hover:bg-blue-100`}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{index + 1}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold  text-gray-800">{items.file_data.originalname}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{items.sender.name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-800">{items.file_data.access_policy}</td>

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
            <div className="w-1/3  bg-white rounded-lg flex  shadow-lg p-4 h-full">

                                            <p>{}</p>

                {
                    (fileContent != null) ?
                        <p className='break-words overflow-auto h-full w-full'>{
                            (plaintext == null) ?
                                fileContent :

                                <>
                                    <div className='flex flex-col gap-4'>{
                                        (plaintext.accessPolicy != 'read') ?
                                            <button onClick={downloadFile} className='w-full p-3.5 rounded-lg text-sm  bg-c_blue text-white'>Download</button>
                                            :
                                            <div className='w-full p-3.5 text-center rounded-lg text-sm  bg-slate-300 text-white'>Read Only </div>
                                    }
                                        <p>{plaintext.fileContent}</p>


                                    </div>
                                </>}
                        </p>
                        : <p className='w-full h-full font-bold text-xl flex items-center  justify-center'>No File Selected !</p>
                }


            </div>
            <div className="w-1/3  bg-white rounded-lg flex flex-col  gap-4 shadow-lg p-4 h-full">
                <h1 className='text-xl font-bold'>Retrive Files</h1>

                <div className="flex flex-col w-full gap-2 ">
                    <label className='font-semibold'>File name</label>
                    <div className='h-14 rounded-lg flex items-center justify-center font-semibold text-center border w-full border-c_blue'>{formData.filename}</div>
                </div>
                <div className="flex flex-col w-full gap-2 ">
                    <label htmlFor='secretkey' className='font-semibold'>Secret Key</label>
                    <input name='secretkey' id='secretkey' onChange={inputChange} value={dform.secretkey} className='h-14 rounded-lg flex items-center p-2 justify-center  text-sm text-center border w-full border-c_blue' />
                </div>

                <div className="flex flex-col w-full gap-2 ">
                    <label htmlFor='hashvalue' className='font-semibold'>Hash Value</label>
                    <input name='hashvalue' id='hashvalue' onChange={inputChange} value={dform.hashvalue} className='h-14 rounded-lg flex items-center p-2 justify-center text-sm  text-center border w-full border-c_blue' />
                </div>
                <button onClick={handleSubmit} className='bg-c_blue hover:bg-blue-600 w-full h-14 rounded-lg text-md text-white font-semibold'>Decrypt File</button>
            </div>
        </section>
    )
}

export default FileView