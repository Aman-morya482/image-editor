import React from 'react'
import { useState } from 'react';
import ConvertPreview from '../components/ConvertPreview';


const ImageConvertor = () => {

  const [images,setImages] = useState([]);
  const [convert,setConvert] = useState([]);
  const [loading,setLoading] = useState(false)

  const handleImageChange = () =>{
    const files = Array.from(event.target.files);
    const filesWithFormat = files.map((file) => ({
    file: file,
    format: 'png', // default format
  }));
    setImages(filesWithFormat);
    setConvert([]);
  }

    const handleFormatChange = (index, newFormat) => {
    const updated = [...images];
    updated[index].format = newFormat;
    setImages(updated);
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
      const imagePayload = await Promise.all(
        images.map(async (imgObj) => ({
          base64: await convertToBase64(imgObj.file),
          format: imgObj.format,
        }))
      );

      console.log(imagePayload);

      const response = await fetch('http://localhost:8080/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: imagePayload }),
      });

      if (!response.ok) throw new Error('Conversion failed');
      const data = await response.json();
      setConvert(data.convertedImages);
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setLoading(false);
      alert("failed");
    }
  };

    const handleRemoveImage = (index) => {
  setImages((prevImages) => prevImages.filter((_, i) => i !== index));
};

    const handleBack = ()=>{
      setImages([]);
    }


  return (
    <div className='grid grid-cols-1 place-items-center'>

   <div className="max-w-[1800px] w-full min-h-[92vh] flex justify-centerce items-center bg-gray-100">
    { images.length <= 0  && ( 
    <div className="w-full flex flex-col justify-center items-center">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-20">Convert Images <p></p> to Another Format</h2>
      <div className="relative flex flex-wrap justify-center items-center p-2 gap-2">
      <div className='group'>
      <p className='bg-blue-600 w-sm md:w-2xl text-white md:font-bold group-active:scale-95 hover:cursor-pointer ring-blue-300 group-hover:ring-3 text-lg md:text-xl rounded-2xl p-4 md:p-5 text-center'>Upload Image </p>
      <input type="file" multiple accept="image/*" onChange={handleImageChange} name="" id="" className='absolute top-10 md:-top-0 bg-red-600 opacity-0 w-sm md:w-2xl text-white text-xl rounded-2xl p-2 md:p-5 text-center'/>
      </div>
      </div>
      </div>
    ) }

    { images.length > 0  && <ConvertPreview images={images} remove={handleRemoveImage} back={handleBack} formatchange={handleFormatChange} convert={convert} sendreq={sendToBackend} loading={loading} /> }
    
    </div>
    
    </div>
  )
}

export default ImageConvertor
