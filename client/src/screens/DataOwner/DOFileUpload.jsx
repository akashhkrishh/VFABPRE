import React, { useState } from 'react'
import CustomInputField from '../../components/CustomInputField'
import { validateAccessPolicy, validateKeyword } from '../../constants/Validation';
import { Info } from 'lucide-react';
import { apiHelper } from '../../utils/apiHandler';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DOFileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContent, setFileContent] = useState(null);
    const navigate = useNavigate();

    const [errForm, setError] = useState({
        keyword: null,
        access_policy: null
    })
    const [formData, setFormData] = useState({
        keyword: '',
        access_policy: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleInputBlur = (e) => {
        const { name, value } = e.target;
        let valueRes;
        if (name == 'keyword') {
            valueRes = validateKeyword(value);
        }
        if (name == 'access_policy') {
            valueRes = validateAccessPolicy(value);
        }

        setError({
            ...errForm,
            [name]: !valueRes
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validKeyword = !validateKeyword(formData.keyword);
        const validAccesspolicy = !validateAccessPolicy(formData.access_policy);

        if (validKeyword || validAccesspolicy) {
            setError({
                ...errForm,
                ["keyword"]: validKeyword,
                ["access_policy"]: validAccesspolicy,
            });
            return
        }


        try {

            const form = new FormData();
            form.append('accessPolicy', formData.access_policy);
            form.append('keyword', formData.keyword);
            form.append('file', selectedFile);


            apiHelper.post('/api/owner/fileupload', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(response => {
                toast.success('File Uploaded successfully!');
                navigate("/dashboard/dataowner/myfiles")
                
            })
        }
        catch (error) {
            toast.error("File Uploaded Failed!");
        }
    };

    function capitalize(str) {
        // Check if the string is empty or null
        if (!str) return '';

        // Capitalize the first letter and concatenate with the rest of the string
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            setFileContent(e.target.result);
        };
        reader.readAsText(file);

    };
    return (
        <section className='px-[100px]  overflow-auto transform transition-all  py-4 pb-8 h-[90vh] flex items-center justify-center'>
            <div className="w-full  bg-white rounded-lg flex gap-4 justify-center items-center shadow-lg p-4 h-full">
                <div className="w-1/3 h-full flex gap-4 overflow-auto flex-col">
                    <h1 className='text-2xl font-semibold '>File Upload</h1>
                    <div className='w-full h-full flex flex-col gap-6'>
                        {
                            selectedFile && <div className='p-3 border  border-gray-300 rounded-md focus:outline-none  focus:border-c_blue  gap-4 w-full sm:text-md flex flex-col'>
                                <span className=' font-bold'>Keyword : <span className='font-normal'> {formData.keyword}</span> </span>
                                <span className=' font-bold'>Access Policy : <span className='font-normal'> {formData.access_policy}</span> </span>
                                <span className=' font-bold'>File Name : <span className='font-normal'> {selectedFile?.name}</span> </span>
                                <span className=' font-bold'>File Type : <span className='font-normal'> {selectedFile?.type}</span> </span>
                                <span className=' font-bold'>File Size : <span className='font-normal'> {selectedFile?.size + " kb"}</span> </span>
                            </div>
                        }
                        <div className='w-full flex gap-2 flex-col '>
                            <CustomInputField
                                label={"keyword"}
                                type={"text"}
                                onBlur={handleInputBlur}
                                onChange={handleInputChange}
                                placeholder={"Enter your File Keyword "}
                                value={formData.keyword}
                            />
                            {errForm.keyword && <span className='text-red-600 text-sm flex items-center gap-2'><Info size={16} /><h1>{"Enter a valid Keyword"}</h1></span>}
                        </div>
                        <div className='w-full flex flex-col gap-2 '>
                            <label className="block font-medium ">{"Access Policy"}</label>
                            <select className="mt-2 p-3 border cursor-pointer border-gray-300 rounded-md focus:outline-none  focus:border-c_blue block w-full sm:text-md" name='access_policy' value={formData.access_policy} onBlur={handleInputBlur} onChange={handleInputChange} required>
                                <option value={null}>Select an option</option>
                                <option value="read">Read</option>
                                <option value="download">Download</option>
                            </select>
                            {errForm.access_policy && <span className='text-red-600 text-sm flex items-center gap-2'><Info size={16} /><h1>{"Enter a valid Keyword"}</h1></span>}
                        </div>

                        {
                            selectedFile && <button onClick={handleSubmit} className='py-3 text-white w-full rounded-lg mt-2 bg-c_blue transition-all hover:bg-blue-600'>Upload</button>
                        }









                    </div>




                </div>
                <div className="w-2/3 whitespace-wrap h-full overflow-auto">

                    {
                        selectedFile ? <div className='flex w-full gap-4 h-full flex-col'>
                            <div className=' w-full p-2 border rounded-lg flex flex-col justify-end items-end'>
                                <div className='flex w-full justify-between items-center'>
                                    <label className='text-2xl font-bold'>{capitalize(selectedFile?.name)}</label>
                                    <label className='p-2 bg-c_blue cursor-pointer  rounded-lg  text-white' htmlFor="dropzone-file">Change File</label>
                                </div>
                                <input className='hidden' id="dropzone-file" onChange={handleFileChange} type="file" />
                            </div>

                            <textarea className='border text-c_blue outline-none  w-full p-4 rounded-lg h-full'

                                value={fileContent == null ? "" : fileContent}
                                readOnly
                            />

                        </div> :

                            <div className="flex items-center justify-center w-full h-full">

                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full   border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-blue-100  dark:bg-blue-100 hover:bg-blue-200 dark:border-blue-100 dark:hover:border-blue-200 dark:hover:bg-blue-200">
                                    <div className="flex flex-col items-center justify-center pt-4 pb-4">
                                        <svg className="w-8 h-full mb-4 text-c_blue " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-c_blue"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-c_blue">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" onChange={handleFileChange} type="file" className="hidden" />
                                </label>
                            </div>

                    }





                </div>

            </div></section>
    )
}

export default DOFileUpload