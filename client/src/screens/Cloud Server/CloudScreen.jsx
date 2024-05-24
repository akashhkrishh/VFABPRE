import React, { useState } from 'react'
import { Cloud } from '../../assets/images'
import CustomInputField from '../../components/CustomInputField';
import { validateEmail, validatePassword } from '../../constants/Validation';
import { Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CloudScreen = () => {
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

  const handleSubmit = (e) => {
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


    navigate('/dashboard/cloud');
    alert(JSON.stringify(formData));
  };

  return (
    <section className='px-[100px]  overflow-auto transform transition-all  py-4 pb-8 h-[90vh] flex items-center justify-center'>
      <div className="w-full h-full flex gap-4">
        <div className="w-2/3 bg-white rounded-lg flex flex-col justify-center items-center shadow-lg p-4 h-full">
          {/* <h1 className='text-2xl font-medium'>Cloud Server</h1> */}
          <img className='h-full' src={Cloud} alt="" />

        </div>

        <form onSubmit={handleSubmit} className="w-1/3 bg-white rounded-lg shadow-lg px-8 flex flex-col gap-4  p-8 h-full">
          <div className='flex flex-col gap-2 h-1/4 '>
            <h1 className='text-4xl font-semibold'>Sign in</h1>
            <span>continue to <span className='text-c_blue font-medium'>Cloud Server</span></span>
          </div>
          <div className='h-3/4 flex flex-col gap-4'>
            <CustomInputField

              label={"email"}
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}

              placeholder="Enter your Email" />
            {errForm.email && <span className='text-red-600 text-sm flex items-center gap-2'><Info size={16} /><h1>{"Enter a valid email address"}</h1></span>}
            <CustomInputField
              label={"password"}
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleInputBlur}

              placeholder="Enter your password" />
            {errForm.password && <span className='text-red-600 text-sm flex items-center gap-2'><Info size={16} /><h1>{"Enter a valid password"}</h1></span>}

            <button className='py-3 text-white w-full rounded-lg bg-c_blue transition-all hover:bg-blue-600'>Login</button>

          </div>



        </form>
      </div>
    </section>
  )
}

export default CloudScreen