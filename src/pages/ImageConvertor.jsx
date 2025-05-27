import React, { useContext, useRef } from 'react'
import { useState, useEffect } from 'react';
import ConvertPreview from '../components/ConvertPreview';
import { userContext } from '../utils/ContextProvider';
import FirstLogin from '../components/FirstLogin';
import gsap from "gsap";



const ImageConvertor = () => {

  const {user} = useContext(userContext);

  const [images,setImages] = useState([]);
  const [type,setType] = useState("png");
  const [convert,setConvert] = useState([]);
  const [loading,setLoading] = useState(false);
  const [login,setLogin] = useState(false);
  const convertRef = useRef(null);

  useEffect(()=>{
    gsap.fromTo(convertRef.current, { y: "10%", opacity: 0}, {
      y: "0%",
      opacity: 1,
      duration:1,
      ease: "power1.inOut"
    });
    },[])

  const handleImageChange = () =>{
    if(!user) return setLogin(true);
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
         console.log("base:",base64Images)

          const imagePayload = {images : base64Images, qualityOrType: type};

           const response = await fetch('http://localhost:8080/image/get-convert', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify( imagePayload ),
           });
        
        if (!response.ok) throw new Error('Conversion failed'+response.err);
        const data = await response.json();
        console.log(data);
        setConvert(data.Images);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setLoading(false);
        alert("convertion failed");
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
  link.download = `${fileName}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const cancelLogin = ()=>{
  setLogin(false);
}

  return (
    <div className='grid grid-cols-1 place-items-center'>

   <div className="max-w-[1800px] w-full min-h-[92vh] bg-blue-200 flex justify-centerce items-center">
    { images.length <= 0  && ( 
    <div className="relative w-full flex flex-col justify-center items-center">
      <span className='svg hidden md:block'><img src="/png/045-abstract-shape-2.png" alt="" width={120} className='absolute -top-20 right-70 float-svg'/></span>
      <span className='svg hidden md:block'><img src="/png/005-phone.png" alt="" width={110} className='absolute bottom-0 left-50 rotate-svg'/></span>
      <h2 ref={convertRef} className="text-4xl md:text-7xl font-bold mb-2 text-center text-gray-800 px-2">Convert Images <p></p> to Another Format</h2>
      <h3 className='mb-8 font-semibold text-blue-700 text-center text-lg px-2'>Convert your images in seconds — fast, easy, and high-quality.</h3>
      <div className="relative flex flex-wrap justify-center items-center p-2 gap-2">
          <div className="group flex justify-center">
            <label className="bg-blue-600 text-white md:font-bold w-xs md:w-2xl ring-blue-300 hover:ring-4 text-lg md:text-xl rounded-full py-2 md:p-5 text-center cursor-pointer active:scale-95">
              Upload Image
              <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
      <div className='z-10 right-40 flex justify-center items-center gap-2 md:text-lg'><select className=' bg-gray-100 p-2 md:p-5 cursor-pointer rounded-3xl outline-blue-500 border-2 border-gray-400' value={type} onChange={(e)=>{setType(e.target.value)}}  >
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="webp">WEBP</option>
            </select>
            </div>
      </div>
      <h1 className='font-semibold text-xl md:text-3xl text-gray-600 mt-6'>-- Supported Formats -- </h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 list-none uppercase font-semibold text-md md:text-xl text-gray-800 mt-5">
      <li className='md:border-r-2 md:pr-6'>PNG 🔁 JPEG </li>
      <li className='md:border-r-2 md:pr-6'>JPEG 🔁 WEBP </li>
      <li>WEBP 🔁 PNG</li>
      </div>
      </div>
    ) }

    { images.length > 0  && <ConvertPreview images={images} type={type} remove={handleRemoveImage} download={download} back={handleBack} back2={handleBackPre} convert={convert} sendreq={sendToBackend} loading={loading} /> }
    
    </div>

    {login && <FirstLogin open={cancelLogin} />}
    
    </div>
  )
}

export default ImageConvertor
