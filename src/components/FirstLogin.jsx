import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";

const FirstLogin = ({open}) => {

    const navigate = useNavigate();

    const handleLogin = ()=>{
        navigate('/login')
    }
    const handleSignup = ()=>{
        navigate('/signup');
    }

  return (
    <div className='absolute top-0 left-0 z-100 flex justify-center items-center w-full h-screen bg-black/50'>
      <div className='w-[400px] h-[300px] bg-white rounded-xl p-10 flex flex-col gap-3 items-center text-md md:text-xl'>
        <p className='text-3xl font-semibold mb-5'>Login to Download</p>
        <p onClick={handleLogin} className='bg-blue-500 text-white rounded-md w-full text-center py-2 hover:cursor-pointer'>Login</p>
        <p onClick={handleSignup} className='bg-gray-300 rounded-md w-full text-center py-2 hover:cursor-pointer'>Sign up</p>
        <p onClick={()=>open(false)} className='rounded-md text-center underline hover:cursor-pointer'>Stay Logged out</p>
      </div>
    </div>
  )
}

export default FirstLogin
