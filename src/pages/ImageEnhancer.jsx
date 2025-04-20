import React, { useContext, useEffect, useState } from 'react'

import { IoIosArrowBack } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { userContext } from '../utils/ContextProvider';
import FirstLogin from '../components/FirstLogin';


const ImageEnhancer = () => {

  const [enhancedImage,setEnhancedImage] = useState(null);
  const [format,setFormat] = useState("image/jpeg");
  const [open,setOpen] = useState(false);
  const [login,setLogin] = useState(false);
  const [canvasSize,setCanvasSize] = useState({width:500,height:500})

  const {user} = useContext(userContext);

  useEffect(()=>{
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      // Small screens (Mobile)
      setCanvasSize({ width: 250, height:300 });
    } else {
      // Larger screens
      setCanvasSize({ width: 500, height: 500 });
    }
  },[])

  const handleUpload = (e)=>{
    const file = e.target.files[0];
    if (!file) return;
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

  const maxWidth = canvasSize.width;
  const maxHeight = canvasSize.height;

  let scale = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
  let newWidth = img.width * scale;
  let newHeight = img.height * scale;
  
  canvas.width = maxWidth;
  canvas.height = maxHeight;
  
  const offsetX = (canvas.width - newWidth) / 2;
  const offsetY = (canvas.height - newHeight) / 2;

  ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let data = imageData.data;

      // === Brightness and Saturation Enhancement ===
      for (let i = 0; i < data.length; i += 4) {
        // Increase brightness
        data[i] += 20;     // R
        data[i + 1] += 20; // G
        data[i + 2] += 20; // B

        // Increase saturation
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const avg = (r + g + b) / 3;
        const saturation = 1.2; // increase saturation by 30%
        data[i]     = avg + (r - avg) * saturation;
        data[i + 1] = avg + (g - avg) * saturation;
        data[i + 2] = avg + (b - avg) * saturation;

        // === Apply Sharpening Convolution ===
        const contrast = 1.2; // >1 increases contrast
        data[i]     = contrast * (data[i] - 128) + 128;
        data[i + 1] = contrast * (data[i + 1] - 128) + 128;
        data[i + 2] = contrast * (data[i + 2] - 128) + 128;
      }


      // Draw enhanced image
      ctx.putImageData(imageData, 0, 0);
      setEnhancedImage(canvas.toDataURL());
    };

    img.src = URL.createObjectURL(file);
  };

  const handleBack = ()=>{
    setEnhancedImage(null);
  }

  const changeFormat = (e)=>{
    setFormat(e.target.dataset.format);
    setOpen(false);
  }
  
  const handleDownload = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const link = document.createElement("a");
    link.download = `enhanced.${format.split("/")[1]}`;
    link.href = canvas.toDataURL(format);
    if(!user) return pendingImage(canvas.toDataURL(format));
    user && link.click();
  };
  img.src = enhancedImage;
};

    const pendingImage = (url)=>{
      setLogin(true);
      const item = {image: url, format:format.split("/")[1] , name: "enhanced-image", expiry: 86400000}
      localStorage.setItem("pendingImage",JSON.stringify(item))
    }

    const cancelLogin= ()=>{
      setLogin(false);
    }


  return (
    <div className='gird grid-cols-1 place-items-center'>

   <div className="max-w-[1800px] w-full min-h-[92vh] flex flex-col justify-center items-center bg-gray-100">
    {!enhancedImage && (
      <div className="w-full flex flex-col justify-center items-center">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-20">Image Enhancer</h2>
      <div className="relative group flex">
       <p className='bg-blue-600 w-xs md:w-2xl text-white md:font-bold group-active:scale-95 hover:cursor-pointer ring-blue-300 hover:ring-2 text-lg md:text-xl rounded-2xl p-5 text-center'>Upload Image </p>
      <input onChange={handleUpload} type="file" name="" id="" className='absolute top-10 md:-top-0 bg-red-600 opacity-0 w-xs md:w-2xl text-white text-xl rounded-2xl p-2 md:p-5 text-center'/>
     </div>
      </div>
    )}

       {enhancedImage && (
        <div className='w-full flex flex-col gap-20 md:gap-10 justify-center items-center py-10 mb-20 md:mb-0'>
        <div className='relative flex justify-between w-4/5'>
          <button onClick={handleBack} className='flex items-center border border-gray-400 gap-1 rounded-md px-3 py-2 cursor-pointer active:scale-95'><IoIosArrowBack size={14}/>Back</button>
          <button className='flex items-center bg-green-400 rounded-md py-2'><p onClick={handleDownload} className='border-r px-2'>Download</p><span className='mb-1 px-2'><FaAngleDown size={16} onClick={()=>{setOpen(!open)}}/></span></button>
          <div className={`absolute right-0 top-10 w-[80px] ${open ? 'opacity-100' : 'opacity-0'}`}>
            <ul className='flex flex-col bg-gray-200 border border-gray-200 rounded-md'>
              <li onClick={(e)=>{changeFormat(e)}} data-format="image/jpeg" className={`hover:bg-gray-300 px-3 py-2 ${format === "image/jpeg" ? 'bg-gray-300' : 'bg-gray-200' }`}>JPEG</li>
              <li onClick={(e)=>{changeFormat(e)}} data-format="image/png" className={`hover:bg-gray-300 px-3 py-2 ${format === "image/png" ? 'bg-gray-300' : 'bg-gray-200' }`}>PNG</li>
              <li onClick={(e)=>{changeFormat(e)}} data-format="image/webp" className={`hover:bg-gray-300 px-3 py-2 ${format === "image/webp" ? 'bg-gray-300' : 'bg-gray-200' }`}>WEBP</li>
            </ul>
          </div>
        </div>
        <img
          src={enhancedImage}
          alt="Enhanced"
          className="rounded shadow "
          style={{ maxWidth: '100%', height: 'auto' }}
          />
          
        { login && <FirstLogin open={cancelLogin}/>}  
        </div>
      )}
    </div>
    
    </div>
  )
}

export default ImageEnhancer
