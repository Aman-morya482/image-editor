import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import ReactCompareImage from "react-compare-image";

import { LuUpload } from "react-icons/lu";



const BgRemover = () => {

  const [result,setResult] = useState("");
  const inputRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait for OpenCV to load
    const waitForOpenCV = setInterval(() => {
      if (window.cv && cv.imread) {
        console.log("ready");
        setReady(true);
        clearInterval(waitForOpenCV);
      }
    }, 100);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event){
      setImageSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const processImage = () => {
    const imgElement = document.getElementById('input-image');
    const canvas = canvasRef.current;

    let src = cv.imread(imgElement);
    let mask = new cv.Mat();
    let bgdModel = new cv.Mat();
    let fgdModel = new cv.Mat();

    let rect = new cv.Rect(10, 10, src.cols - 20, src.rows - 20);
    cv.grabCut(src, mask, rect, bgdModel, fgdModel, 5, cv.GC_INIT_WITH_RECT);

    // Create binary mask for foreground
    for (let i = 0; i < mask.rows; i++) {
      for (let j = 0; j < mask.cols; j++) {
        let val = mask.ucharPtr(i, j)[0];
        mask.ucharPtr(i, j)[0] = (val === cv.GC_FGD || val === cv.GC_PR_FGD) ? 255 : 0;
      }
    }

    let result = new cv.Mat();
    src.copyTo(result, mask);

    // Render to canvas
    cv.imshow(canvas, result);

    // Convert to transparent
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) {
        data[i + 3] = 0; // make white transparent
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Cleanup
    src.delete(); mask.delete(); result.delete(); bgdModel.delete(); fgdModel.delete();
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'transparent-output.png';
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
      <input ref={inputRef} onChange={handleImageUpload} type="file" accept='image/*' name="" id="" className='bg-red-600 opacity-0 w-xs text-white text-xl rounded-2xl p-3 text-center'/>
      </div>
     </div>
     </div>

     {imageSrc && (
        <>
          <img id="input-image" src={imageSrc} alt="input" hidden crossOrigin="anonymous" />
          <button
            onClick={processImage}
            disabled={!ready}
            className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
          >
            {ready ? 'Remove Background' : 'Loading...'}
          </button>
          <button
            onClick={downloadImage}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Download PNG
          </button>
          <canvas ref={canvasRef} id="canvasOutput" className="mt-4 border w-full" />
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