import React, { useState } from 'react'
import CustomInputField from '../../components/CustomInputField'
import { validateCity, validateEmail, validateName, validatePassword, validatePhone } from '../../constants/Validation';
import { Info } from 'lucide-react';
import { apiHelper } from '../../utils/apiHandler';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DOSignupForm = ({ isLogin }) => {
  const navigate = useNavigate();
  const [errForm, setError] = useState({
    name: null,
    email: null,
    phone: null,
    city: null,
    password: null,
  })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city:'',
    password: '',
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
    if (name == 'email') {
      valueRes = validateEmail(value);
    }
    if (name == 'name') {
      valueRes = validateName(value);
    }
    if (name == 'city') {
      valueRes = validateCity(value);
    }
    if (name == 'phone') {
      valueRes = validatePhone(value);
    }
    if (name == 'password') {
      valueRes = validatePassword(value);
    }

    setError({
      ...errForm,
      [name]: !valueRes
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validEmail = !validateEmail(formData.email);
    const validPassword = !validatePassword(formData.password);
    const validPhone = !validatePhone(formData.phone);
    const validCity = !validateCity(formData.city);
    const validName = !validateName(formData.name);
    if (validEmail || validName || validPassword || validCity || validCity) {
      setError({
        ...errForm,
        ["email"]: validEmail,
        ["name"]: validName,
        ["phone"]: validPhone,
        ["city"]: validCity,
        ["password"]: validPassword,
      });
      return
    }

    await apiHelper.post("/api/owner/create",formData)
    .then((res)=>{
      toast.success("Registered Success",{duration: 3000});
      

      isLogin(true);
    }).catch((err)=>{
      setFormData({
        name: '',
        email: '',
        phone: '',
        city:'',
        password: '',
      });
      toast.error(err.response.data.message,{duration: 3000})
    })


  };



  return (
    <form onSubmit={handleSubmit} className='h-[66vh] overflow-y-auto scrollbar  transition-all flex flex-col gap-2 mt-4 transform ease-linear w-full'>
      <div className='h-auto flex w-full flex-col gap-2 my-4 '>
        <h1 className='text-4xl font-semibold'>Register</h1>
        <span>continue to <span className='text-c_blue font-medium'>Data Owner</span></span>
      </div>
     
      <div className=' h-auto'>
      <div className='w-full flex flex-col gap-2 mt-2'>
        <CustomInputField
          label={"name"}
          type={"text"}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          placeholder={"Enter your name "}
          value={formData.name}
        />
        
     
        {errForm.name && <span className='text-red-600 text-sm flex items-center gap-2'><Info size={16} /><h1>{"Enter a valid name"}</h1></span>}
      </div>
      <div className='w-full flex flex-col gap-2 mt-2'>
        <CustomInputField
          label={"email"}
          type={"email"}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          placeholder={"Enter your email address "}
          value={formData.email}
        />
        

        {errForm.email && <span className='text-red-600 text-sm flex items-center gap-2'><Info size={16} /><h1>{"Enter a valid email address"}</h1></span>}
      </div>
      <div className='w-full flex flex-col gap-2 mt-2'>
        <CustomInputField
          label={"phone"}
          type={"number"}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          placeholder={"Enter your phone number"}
          value={formData.phone}
        />
        

        {errForm.phone && <span className='text-red-600 text-sm flex items-center gap-2'><Info size={16} /><h1>{"Enter a valid phone number"}</h1></span>}
      </div>
      <div className='w-full flex flex-col gap-2 mt-2'>
        <CustomInputField
          label={"city"}
          type={"text"}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          placeholder={"Enter your phone number"}
          value={formData.city}
        />
        

        {errForm.city&& <span className='text-red-600 text-sm flex items-center gap-2'><Info size={16} /><h1>{"Enter a valid city name"}</h1></span>}
      </div>
      <div className='w-full flex flex-col gap-2 mt-2'>
        <CustomInputField
          label={"password"}
          type={"password"}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          placeholder={"Enter your password"}
          value={formData.password}
        />
        
        {errForm.password && <span className='text-red-600 text-sm flex items-center gap-2'><Info size={16} /><h1>{"Enter a valid password"}</h1></span>}
      </div>
      

      <button className='py-3 text-white w-full rounded-lg mt-4 bg-c_blue transition-all hover:bg-blue-600'>Register</button>

      </div>
    </form>
  
  )
}

export default DOSignupForm