import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ReactCompareImage from "react-compare-image";

import { LuUpload } from "react-icons/lu";



const BgRemover = () => {

  const [result,setResult] = useState("");

  return (
    <div className='grid grid-cols-1 place-items-center'>
    
    <div className='h-[92vh] w-full max-w-[1800px] flex flex-col-reverse md:flex-row justify-center items-center gap-10 md:gap-5 lg:gap-20 xl:gap-40 p-20 overflow-hidden'>
     <div className='w-sm min-w-xs md:w-lg xl:w-xl rounded-2xl overflow-hidden'>
     <video src="/img/bg-video.mp4" autoPlay loop className=''></video>
     </div>
     
     <div className='flex flex-col justify-center items-center gap-6'>
      <p className='text-3xl md:text-4xl font-bold'>Background Remover <p className='text-base mt-2 font-normal text-center bg-yellow-400 py-1 md:py-2 rounded-lg'>100% Automatically and Free</p></p>
     <div className='flex flex-col justify-center items-center gap-5 border border-gray-600 border-dashed p-8 md:p-15  rounded-2xl'>
      <LuUpload className='text-gray-500 text-5xl md:text-8xl'/>
      <div className='relative group'>
      <p className='absolute top-0 bg-blue-600 w-xs group-active:scale-95 text-white hover:cursor-pointer ring-blue-300 hover:ring-2 text-lg md:text-xl rounded-2xl p-2 md:p-3 text-center'>Upload Image </p>
      <input type="file" name="" id="" className='bg-red-600 opacity-0 w-xs text-white text-xl rounded-2xl p-3 text-center'/>
      </div>
     </div>
     </div>
     
     </div>

     {
      result && 
      <div className='h-[50vh]'>djfns
      </div>
     }
    
    </div>
  )
}

export default BgRemover;