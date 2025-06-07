import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {gsap} from "gsap"

import SavedDrafts from '../components/SavedDrafts'

import { MdOutlineCropFree , MdOutlineCropRotate } from "react-icons/md";
import { RiColorFilterFill } from "react-icons/ri";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { MdOutlineTextFields } from "react-icons/md";



const Editor = () => {
  
  const navigate = useNavigate()

  useEffect(()=>{
    gsap.fromTo(".boxRef1", { y: "10%", opacity: 0}, {
      y: "0%",
      opacity: 1,
      duration:1,
      ease: "power1.inOut"
     });
    gsap.fromTo(".boxRef2", { scale: "0.9", opacity: 0}, {
      scale: "1",
      opacity: 1,
      duration:1,
      ease: "power1.inOut"
     });
  },[])

  const handleImageUpload = (e)=>{
    const file = e.target.files[0];
    console.log(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem("uploadedImage", reader.result);
        console.log(reader.result);
        navigate("/edit-image", { state: { newImage: reader.result}});
    }
    reader.readAsDataURL(file);
    }
  }

  return (
    <div className='grid grid-cols-1 place-items-center w-full'>
      <div className='relative flex justify-around items-center h-screen w-full max-w-[1800px] z-10 bg-cyan-200 overflow-hidden'>
        {/* <img src="img/Screenshot 2025-05-16 105026.jpg" alt="" className='hidden md:block absolute -top-10 -z-10 -right-20 w-xs'/> */}
        <div className='w-full flex flex-col justify-between items-center py-10 md:pl-20 overflow-hidden'>
          <div className='flex flex-col justify-center items-center'>
            <h1 className='boxRef2 text-4xl md:text-6xl font-bold leading-[50px] md:leading-[70px] text-center'>The Online <br className='md:hidden'/> <span className='text-blue-700'>image Editor</span> <br />Made for Everyone</h1>
            <label className='boxRef2 w-xs md:w-xl py-3 md:py-4 px-5 mt-6 text-center text-2xl active:scale-95 cursor-pointer hover:ring-3 ring-blue-400 bg-blue-600 text-white rounded-full font-semibold tracking-wider'>
              Start Editing
              <input type="file" onChange={handleImageUpload} accept='image/*' className='hidden' />
              </label>
          </div>
          
          <div className='w-full md:w-5xl flex flex-wrap justify-center p-10 gap-x-8 gap-y-4 mt-2'>
            <div className='boxRef1 flex items-center justify-center w-2xs gap-2 border-2 border-white rounded-md bg-white/30 hover:bg-white/50 py-4 px-6 text-lg text-indigo-600 font-semibold'>
            <MdOutlineCropFree size={22}/> Crop Image
            </div>
            <div className='boxRef1 flex items-center justify-center w-2xs gap-2 border-2 border-white rounded-md bg-white/30 hover:bg-white/50 py-4 px-6 text-lg text-indigo-600 font-semibold'>
            <MdOutlineCropRotate size={22}/> Rotate Image
            </div>
            <div className='boxRef1 flex items-center justify-center w-2xs gap-2 border-2 border-white rounded-md bg-white/30 hover:bg-white/50 py-4 px-6 text-lg text-indigo-600 font-semibold'>
            <RiColorFilterFill size={22}/> Apply Filters
            </div>
            <div className='boxRef1 flex items-center justify-center w-2xs gap-2 border-2 border-white rounded-md bg-white/30 hover:bg-white/50 py-4 px-6 text-lg text-indigo-600 font-semibold'>
            <HiMiniAdjustmentsHorizontal size={22}/> Adjust Lights
            </div>
            <div className='boxRef1 flex items-center justify-center w-2xs gap-2 border-2 border-white rounded-md bg-white/30 hover:bg-white/50 py-4 px-6 text-lg text-indigo-600 font-semibold'>
            <MdOutlineTextFields size={22}/> Add Texts
            </div>
            
          </div>
          <div></div>
        </div>
      </div>

      {/* <SavedDrafts/> */}

    </div>
  )
}

export default Editor
