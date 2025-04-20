import React, { useState } from 'react'
import { TiDeleteOutline } from "react-icons/ti";
import { IoIosArrowBack } from "react-icons/io";



const ConvertPreview = (prop) => {


    return (
    <div className='w-full md:w-3/4 mx-auto'>
            
            <div className='relative min-h-[60vh] flex flex-col bg-white overflow-hidden px-2 py-10 md:px-10 md:py-20 gap-20'>
            
            {prop.images && prop.convert.length <= 0 && (
            <div className='flex flex-col gap-20'>
            <div className='flex justify-between items-center w-full'>
                <button className='z-10 text-black rounded-md hover:cursor-pointer active:scale-95 border p-2 pr-4 md:text-xl flex gap-2 items-center' onClick={prop.back}><IoIosArrowBack/>Back</button>
                <button className='z-10 bg-blue-600 outline-0 text-white rounded-md hover:cursor-pointer ring-blue-300 active:scale-95 hover:ring-3 px-4 py-2 md:text-xl' onClick={prop.sendreq}>{prop.loading ? <p>Loading..</p> : <p>Convert</p>}</button>
            </div>
              <div className="w-full flex flex-col gap-6 px-2 md:px-10 h-auto">
               {prop.images.map((image, index) => (
                 <div key={index} className='relative flex justify-evenly items-center border border-gray-200 shrink-0 overflow-hidden rounded-xl'>
                <p className=' left-0 bg-gray-300 px-4 py-4'>{index + 1}</p>
                <div className='w-full flex justify-between items-center px-2 md:px-5'>
                <p key={index}>{image.name}</p>
                </div>
                <p className='cursor-pointer bg-gray-300 px-3 py-4' onClick={()=>{prop.remove((index))}}><TiDeleteOutline size={25}/></p>
                </div>
              ))}
    
            </div>
            </div>
            )}
            {
                prop.convert.length > 0 && (
         <div className='flex flex-col gap-20'>
        <div className='flex justify-between items-center w-full'>
            <button className='z-10 text-black rounded-md hover:cursor-pointer active:scale-95 border p-2 pr-4 md:text-xl flex gap-2 items-center' onClick={prop.back2}><IoIosArrowBack/>Back</button>
        </div>
          <div className="w-full flex flex-col gap-6 px-2 md:px-10 h-auto">
           {prop.convert.map((image, index) => (
            <div key={index} className='relative flex justify-evenly items-center border border-gray-200 shrink-0 overflow-hidden rounded-xl'>
            <p className=' left-0 bg-gray-300 px-4 py-4'>{index + 1}</p>
            <div className='w-full flex justify-between items-center px-2 md:px-5'>
            <p>{prop.images[index].name.split('.')[0]+'.'+prop.type}</p>
            </div>
            <button onClick={() => prop.download(image, `image-${index + 1}.${prop.type}`)} className='cursor-pointer bg-green-500 text-white px-3 py-4'>Download</button>
            </div> 
          ))}

        </div>
        </div>
    
            )}
            
            </div>
          
        </div>
  )
}

export default ConvertPreview

