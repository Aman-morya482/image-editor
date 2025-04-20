import React, {useEffect} from 'react'
import { NavLink, useNavigate } from "react-router-dom";

const FirstLogin = ({open}) => {

    const navigate = useNavigate();

    useEffect(() =>{
        if(open){document.body.style.overflow = "hidden"}
        else {document.body.style.overflow = "auto"}

        return ()=>{document.body.style.overflow = "auto"}
    },[open])

    const handleLogin = ()=>{
        navigate('/login')
    }
    const handleSignup = ()=>{
        navigate('/signup');
    }

  return (
    <div className={`fixed inset-0 z-100 flex justify-center items-center bg-black/50`}>
      <div className={`w-[90%] max-w-md bg-white rounded-xl p-8 flex flex-col gap-4 items-center text-md md:text-xl shadow-xl`}>
        <p className='text-3xl font-semibold mb-5 text-center'>Login to Download</p>
        <p onClick={handleLogin} className='bg-blue-500 text-white rounded-md w-full text-center py-2 cursor-pointer'>Login</p>
        <p onClick={handleSignup} className='bg-gray-300 rounded-md w-full text-center py-2 cursor-pointer'>Sign up</p>
        <p onClick={()=>open()} className='rounded-md text-center underline cursor-pointer'>Stay Logged out</p>
      </div>
    </div>
  )
}

export default FirstLogin
