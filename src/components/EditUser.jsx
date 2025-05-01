import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../utils/ContextProvider'


const EditUser = ({open, setOpen}) => {

    const {user,setUser} = useContext(userContext);

    const [edit,setEdit] = useState(user.value.name);

    let userData = JSON.parse(localStorage.getItem("User"));

    useEffect(() =>{
        if(open){document.body.style.overflow = "hidden"}
        else {document.body.style.overflow = "auto"}

        return ()=>{document.body.style.overflow = "auto"}
    },[open])

    const handleSave = (userData)=>{
        userData.value.name = edit;
        setUser(userData);
        localStorage.setItem("User",JSON.stringify(userData));
        setOpen(false)
    }


  return (
    <div className='fixed inset-0 bg-black/50 z-100 w-full h-screen  flex justify-center items-center font-normal'>
      <div className='relative p-6 flex flex-col justify-start items-center w-[380px] h-[250px] bg-white border shadow-2xl rounded-xl'>
        <p className='text-3xl font-semibold'>Edit Profile</p>
        <div className='w-full flex flex-col justify-between items-center gap-1 mt-12'>
        <div className='text-lg'>
            <label className='font-semibold' htmlFor="">Username: </label>
            <input type="text" className='border w-[200px] py-1 px-2 rounded-md' value={edit} onChange={(e)=>{setEdit(e.target.value)}}/>
        </div> 
        <div className='flex gap-3 mt-6'>
            <button className='bg-red-500 text-white py-2 px-3 rounded-md hover:cursor-pointer ring-red-300 hover:ring-3' onClick={()=>{setOpen(false)}}>Cancel</button>
            <button className='bg-blue-500 text-white py-2 px-3 rounded-md hover:cursor-pointer ring-blue-300 hover:ring-3' onClick={()=>handleSave(userData)}>Save</button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default EditUser
