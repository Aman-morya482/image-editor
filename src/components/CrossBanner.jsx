import React from 'react'

const CrossBanner = () => {
  return (
    <div>
        <div className='relative overflow-hidden h-[45vh] w-full max-w-[1600px] flex flex-col justify-center items-center font-tektur'>
        <div className='w-max bg-blue-700 text-white whitespace-nowrap text-2xl md:text-5xl font-bold py-4 md:py-8 '>
          <h1 ref={marText2} className='px-8 flex space-x-10'>
           <p>Image Editor</p><p>*</p>
           <p>PDF Maker </p><p>*</p>          
           <p>BG Remover </p><p>*</p>
           <p>Image Enhancer </p><p>*</p>
           <p>Image Compressor</p><p>*</p>          
       
           </h1>
        </div>
        <div className='w-max border-b-3 border-blue-700 bg-white whitespace-nowrap text-blue-700 text-2xl md:text-5xl font-bold py-4 md:py-8 '>
          <h1 ref={marText1} className='px-8 flex space-x-10'>
           <p>Image Compressor</p><p>*</p>       
           <p>Image Enhancer</p><p>*</p>
           <p>Image BG Remover</p><p>*</p>
           <p>Image Convertor</p><p>*</p>
           <p>Image Analyser</p><p>*</p>
           </h1>
        </div>
      </div>
    </div>
  )
}

export default CrossBanner
