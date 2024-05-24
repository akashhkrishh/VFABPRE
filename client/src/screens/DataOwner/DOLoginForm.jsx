import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CustomInputField from '../../components/CustomInputField'
import { validateEmail, validatePassword } from '../../constants/Validation';
import { Info } from 'lucide-react';
import { apiHelper } from '../../utils/apiHandler';
import toast from 'react-hot-toast';

const DOLoginForm = () => {
  const navigate = useNavigate();
  const [errForm, setError] = useState({
    email: null,
    password: null,
  })
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    if (name == 'password') {
      valueRes = validatePassword(value);
    }

    setError({
      ...errForm,
      [name]: !valueRes
    });
  }

  const handleSubmit =async(e) => {
    e.preventDefault();
    const validEmail = !validateEmail(formData.email);
    const validPassword = !validatePassword(formData.password);

    if (validEmail || validPassword) {
      setError({
        ...errForm,
        ["email"]: validEmail,
        ["password"]: validPassword,
      });
      return
    }

    await apiHelper.post("/api/owner/login",formData)
    .then((res)=>{
      localStorage.setItem('token',res.data.token)
      toast.success("Login Succes");
      navigate("/dashboard/dataowner")
    })
    .catch((err)=>{
      console.log(err)
      if(err.response.data.key == 'P')
        toast(err.response.data.message,{style: {
          borderRadius: '8px',
          background: '#333',
          color: '#fff',
        },});
      else
        toast.error(err.response.data.message);
    }
  );

    
  };



  return (
    <form onSubmit={handleSubmit} className='h-full transition-all flex flex-col gap-2 mt-4 transform ease-linear w-full'>
      <div className='flex w-full flex-col gap-2 my-4 '>
        <h1 className='text-4xl font-semibold'>Sign in</h1>
        <span>continue to <span className='text-c_blue font-medium'>Data Owner</span></span>
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
      <div className='w-full flex flex-col gap-2'>
        <CustomInputField
          label={"password"}
          type={"password"}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          placeholder={"Enter your password "}
          value={formData.password}
        />

        {errForm.password && <span className='text-red-600 text-sm flex items-center gap-2'><Info size={16} /><h1>{"Enter a valid password"}</h1></span>}
      </div>

      <button className='py-3 text-white w-full rounded-lg mt-2 bg-c_blue transition-all hover:bg-blue-600'>Login</button>

    </form>
  )
}

export default DOLoginForm