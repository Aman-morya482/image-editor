import React, { useState } from 'react'
import { TiDeleteOutline } from "react-icons/ti";
import { IoIosArrowBack } from "react-icons/io";



const CompressPreview = (prop) => {

    console.log(prop.images)

    return (
    <div className='w-full md:w-3/4 mx-auto'>
        
        <div className='relative min-h-[60vh] flex md:justify-between md:items-center bg-white p-10 md:p-30 py-50 overflow-hidden'>
        {prop.images && (
            <div className="w-full flex flex-col gap-6">
           {prop.images.map((image, index) => (
            <div key={index} className='relative flex items-center border border-gray-200 shrink-0 overflow-hidden rounded-xl'>
            <p className='absolute left-0 bg-gray-300 px-4 py-4'>{index + 1}</p>
            <div className='w-full flex justify-between items-center px-15'>
            <p key={index} className='p-4 px-10'>{image.name}</p>
            <p className='p-4 px-10'>Size: {image.size}</p>
            </div>
            <p className='absolute right-0 bg-gray-300 px-3 py-4' onClick={()=>{prop.remove((index))}}><TiDeleteOutline size={25}/></p>
            </div>
          ))}

        <div>
            <button className='absolute top-10 left-5 md:left-10 text-black rounded-md hover:cursor-pointer active:scale-95 border p-2 pr-4 text-xl flex gap-2 items-center' onClick={prop.back}><IoIosArrowBack/>Back</button>
            <button className='absolute top-10 right-5 md:right-10 bg-blue-600 outline-0 text-white rounded-md hover:cursor-pointer ring-blue-300 active:scale-95 hover:ring-3 px-4 py-2 text-xl font-semibold' onClick={prop.sendreq}>{prop.loading ? <p>Loading..</p> : <p>Convert</p>}</button>
        </div>
        </div>
        )}
        {
            prop.copress && (
            <div className="w-full flex flex-col gap-6">
            {prop.compress.map((image, index) => (
            <div key={index} className='relative flex items-center border border-gray-200 shrink-0 overflow-hidden rounded-xl'>
            <p className='absolute left-0 bg-gray-300 px-4 py-4'>{index + 1}</p>
            <div className='w-full flex justify-between items-center px-15'>
            <p key={index} className='p-4 px-10'>{image.name}</p>
            <p className='p-4 px-10'>Original Size: {prop.images[index].size}</p>
            <p className='p-4 px-10'>Compressed Size: {image.size}</p>
            </div>
            <button className='bg-blue-600 outline-0 text-white rounded-md hover:cursor-pointer ring-blue-300 active:scale-95 hover:ring-3 px-4 py-2 text-xl font-semibold'>Download</button>
            <p className='absolute right-0 bg-gray-300 px-3 py-4' onClick={()=>{prop.remove((index))}}><TiDeleteOutline size={25}/></p>
            </div>
          ))}
                <div>
                <button className='absolute top-10 left-5 md:left-10 text-black rounded-md hover:cursor-pointer active:scale-95 border p-2 pr-4 text-xl flex gap-2 items-center' onClick={prop.back2}><IoIosArrowBack/>Back</button>
                </div>
                </div>

        )}
        
        </div>
      
    </div>
  )
}

export default CompressPreview

