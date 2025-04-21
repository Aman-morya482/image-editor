import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import ReactCompareImage from "react-compare-image";

import { LuUpload } from "react-icons/lu";



const BgRemover = () => {

  const [result,setResult] = useState(null);
  const [loading,setLoading] = useState(false);
  const canvasRef = useRef(null);
  const [image,setImage] = useState(null);


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setResult(null);
  };

      const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    const sendToBackend = async () => {
      setLoading(true);
     try {
        const base64Images = await Promise.all(
        image.map((img) => convertToBase64(img))
        );

        const imagePayload = {
        images : base64Images,
        };

        const response = await fetch('http://localhost:8080/get-bgRemoved', {
        method: 'POST',
            headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify( imagePayload ),
           });
        
        if (!response.ok) throw new Error('Conversion failed'+response.err);
        const data = await response.json();
        setResult(data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setLoading(false);
        alert("failed");
      }
    };



  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'bg-removed.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className='grid grid-cols-1 place-items-center'>
    
    <div className='h-[92vh] w-full max-w-[1800px] flex flex-col-reverse md:flex-row justify-center items-center gap-10 md:gap-5 lg:gap-20 xl:gap-40 p-20 overflow-hidden'>
     <div className='w-sm min-w-xs md:w-lg xl:w-xl rounded-2xl overflow-hidden'>
     <video src="/img/bg-video.mp4" autoPlay loop className=''></video>
     </div>
     
     <div className='flex flex-col justify-center items-center gap-6'>
      <h1 className='text-3xl md:text-4xl font-bold'>Background Remover <p className='text-base mt-2 font-normal text-center bg-yellow-400 py-1 md:py-2 rounded-lg'>100% Automatically and Free</p></h1>
     <div className='flex flex-col justify-center items-center gap-5 border border-gray-600 border-dashed p-8 md:p-15  rounded-2xl'>
      <LuUpload className='text-gray-500 text-5xl md:text-8xl'/>
      <div className='relative group'>
      <p className='absolute top-0 bg-blue-600 w-xs group-active:scale-95 text-white hover:cursor-pointer ring-blue-300 hover:ring-2 text-lg md:text-xl rounded-2xl p-2 md:p-3 text-center'>Upload Image </p>
      <input onChange={handleImageUpload} type="file" accept='image/*' name="" id="" className='bg-red-600 opacity-0 w-xs text-white text-xl rounded-2xl p-3 text-center'/>
      </div>
     </div>
     </div>

     {result && (
        <>
          <img id="input-image" src={result} alt="input" hidden crossOrigin="anonymous" />
          <button
            onClick={processImage}
            disabled={!ready}
            className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
          >
            {loading ? 'Remove Background' : 'Loading...'}
          </button>
          <button
            onClick={downloadImage}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Download PNG
          </button>
        </>
      )}
     
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