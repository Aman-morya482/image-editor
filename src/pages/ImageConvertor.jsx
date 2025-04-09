import React from 'react'
import { useState, useEffect } from 'react';
import ConvertPreview from '../components/ConvertPreview';


const ImageConvertor = () => {

  const [images,setImages] = useState([]);
  const [type,setType] = useState("png");
  const [convert,setConvert] = useState([]);
  const [loading,setLoading] = useState(false)

  const handleImageChange = () =>{
    const files = Array.from(event.target.files);
    setImages(files);
    setConvert([]);
  }

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
          images.map((img) => convertToBase64(img))
         );

          const imagePayload = {
          images : base64Images,
          };

           const response = await fetch('http://localhost:8080/image/get-compressed-quality', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify( imagePayload ),
           });
       console.log(JSON.stringify(imagePayload ))
        
        if (!response.ok) throw new Error('Conversion failed'+response.err);
        const data = await response.json();
        setConvert(data);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setLoading(false);
        alert("failed");
      }
    };
  
      useEffect(()=>{
        console.log("convert", convert)
      },[convert])

    const handleRemoveImage = (index) => {
  setImages((prevImages) => prevImages.filter((_, i) => i !== index));
};

    const handleBack = ()=>{
      setImages([]);
    }
    const handleBackPre = ()=>{
      setConvert([]);
    }


  const download = (base64String, fileName = "image") => {
  const link = document.createElement("a");
  link.href = base64String;
  link.download = `${fileName}.${type}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  return (
    <div className='grid grid-cols-1 place-items-center'>

   <div className="max-w-[1800px] w-full min-h-[92vh] flex justify-centerce items-center bg-gray-100">
    { images.length <= 0  && ( 
    <div className="w-full flex flex-col justify-center items-center">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-20">Convert Images <p></p> to Another Format</h2>
      <div className="relative flex flex-wrap justify-center items-center p-2 gap-2">
      <div className='group'>
      <p className='bg-blue-600 w-xs md:w-2xl text-white md:font-bold group-active:scale-95 hover:cursor-pointer ring-blue-300 group-hover:ring-3 text-lg md:text-xl rounded-2xl p-4 md:p-5 text-center'>Upload Image </p>
      <input type="file" multiple accept="image/*" onChange={handleImageChange} name="" id="" className='absolute top-10 md:-top-0 bg-red-600 opacity-0 w-xs md:w-2xl text-white text-xl rounded-2xl p-2 md:p-5 text-center'/>
      </div>
      <div className='z-10 right-40 flex justify-center items-center gap-2 md:text-lg '><select className=' bg-gray-200 p-5 rounded-md' value={type} onChange={(e)=>{setType(e.target.value)}}  >
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="Wepb">WEBP</option>
            </select>
            </div>
      </div>
      </div>
    ) }

    { images.length > 0  && <ConvertPreview images={images} remove={handleRemoveImage} download={download} back={handleBack} back2={handleBackPre} convert={convert} sendreq={sendToBackend} loading={loading} /> }
    
    </div>
    
    </div>
  )
}

export default ImageConvertor
