import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../utils/ContextProvider'


const LogoutConfirm = ({setConfirm, setClick, logout}) => {

    const {user,setUser} = useContext(userContext);

    const [edit,setEdit] = useState(user.value);

    let userData = JSON.parse(localStorage.getItem("User"));

    useEffect(() =>{
        if(open){document.body.style.overflow = "hidden"}
        else {document.body.style.overflow = "auto"}

        return ()=>{document.body.style.overflow = "auto"}
    },[open])

    const handleSave = (userData)=>{
        userData.value = edit;
        setUser(userData);
        localStorage.setItem("User",JSON.stringify(userData));
        setOpen(false)
    }


  return (
    <div className='absolute left-0 top-0 z-100 w-full h-screen  flex justify-center items-center font-normal'>
      <div className='relative py-6 px-6 flex flex-col justify-start w-[350px] h-[160px] bg-white border shadow-2xl rounded-xl'>
        <p className='text-2xl font-semibold'>Confirm Logout</p>
        <p className='text-sm'>Are you sure you want to logout?</p>
        <div className='w-full flex justify-center items-center gap-4 mt-6'>
            <button onClick={()=>setConfirm(false)} className='bg-red-500 text-white py-2 px-3 rounded-md hover:cursor-pointer ring-red-300 hover:ring-3'>Cancel</button>
            <button onClick={()=>logout(setConfirm,setClick)} className='bg-blue-500 text-white py-2 px-3 rounded-md hover:cursor-pointer ring-blue-300 hover:ring-3'>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default LogoutConfirm
