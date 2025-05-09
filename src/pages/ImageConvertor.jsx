import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import ConvertPreview from '../components/ConvertPreview';
import { userContext } from '../utils/ContextProvider';
import FirstLogin from '../components/FirstLogin';


const ImageConvertor = () => {

  const {user} = useContext(userContext);

  const [images,setImages] = useState([]);
  const [type,setType] = useState("png");
  const [convert,setConvert] = useState([]);
  const [loading,setLoading] = useState(false);
  const [login,setLogin] = useState(false);

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
        setConvert(data);
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

   <div className="max-w-[1800px] w-full min-h-[92vh] flex justify-centerce items-center bg-gray-100">
    { images.length <= 0  && ( 
    <div className="w-full flex flex-col justify-center items-center">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-20">Convert Images <p></p> to Another Format</h2>
      <div className="relative flex flex-wrap justify-center items-center p-2 gap-2">
          <div className="group flex justify-center">
            <label className="bg-blue-700 text-white md:font-bold w-xs md:w-2xl ring-blue-300 hover:ring-3 text-lg md:text-xl rounded-2xl py-2 md:p-5 text-center cursor-pointer active:scale-95">
              Upload Image
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
      <div className='z-10 right-40 flex justify-center items-center gap-2 md:text-lg borde'><select className=' bg-gray-200 p-5 rounded-md border-2 border-gray-400' value={type} onChange={(e)=>{setType(e.target.value)}}  >
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="webp">WEBP</option>
            </select>
            </div>
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
