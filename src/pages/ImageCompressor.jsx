import { useContext, useState } from "react";
import CompressPreview from "../components/CompressPreview";
import { userContext } from "../utils/ContextProvider";
import FirstLogin from "../components/FirstLogin";

const ImageCompressor = () => {

    const [images,setImages] = useState([]);
    const [quality,setQuality] = useState("0.3F");
    const [compress,setCompress] = useState([]);
    const [loading,setLoading] = useState(false);
    const [login,setLogin] = useState(false);
  
    const {user} = useContext(userContext);

    const handleImageChange = () =>{
      if(!user) setLogin(true);
      const files = Array.from(event.target.files);
      setImages(files);
      setCompress([]);
      
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
        qualityOrType : quality,
        };

        const response = await fetch('http://localhost:8080/image/get-compressed-quality', {
        method: 'POST',
            headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify( imagePayload ),
           });
        
        if (!response.ok) throw new Error('Conversion failed'+response.err);
        const data = await response.json();
        setCompress(data.Images);
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
  
      const handleBacktohome = ()=>{
        setImages([]);
      }
      const handleBacktopre = ()=>{
        setCompress([]);
      }
  
const download = (base64String, fileName = "image") => {
  const mimeMatch = base64String.match(/^data:(image\/\w+);base64,/);
  if (!mimeMatch) {
    console.error("Invalid base64 image format.");
    return;
  }

  const mimeType = mimeMatch[1];
  const ext = mimeType.split("/")[1];

  // Create download link
  const link = document.createElement("a");
  link.href = base64String;
  link.download = `${fileName}.${ext}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  const cancelLogin = ()=>{
    setLogin(false);
    setImages([]);
  }

  return (
    <div className='gird grid-cols-1 place-items-center'>

   <div className="max-w-[1800px] w-full min-h-[92vh] flex justify-centerce items-center bg-gray-100">
    { images.length <= 0 && (  
      <div className="w-full flex flex-col justify-center items-center">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-20">Image Compressor</h2>
      <div className="relative group flex">
       <p className='bg-blue-600 w-xs md:w-2xl text-white md:font-bold group-active:scale-95 hover:cursor-pointer ring-blue-300 hover:ring-2 text-lg md:text-xl rounded-2xl p-5 text-center'>Upload Image </p>
      <input type="file" multiple accept="image/*" onChange={handleImageChange} name="" id="" className='absolute top-10 md:-top-0 bg-red-600 opacity-0 w-xs md:w-2xl text-white text-xl rounded-2xl p-2 md:p-5 text-center'/>
     </div>
      </div>
    )}
    {
      images.length > 0 && <CompressPreview  images={images} back={handleBacktohome} download={download} back2={handleBacktopre} quality={quality} setQuality={setQuality} remove={handleRemoveImage} loading={loading} compress={compress} sendreq={sendToBackend} />
    }
    </div>
    
    { login && <FirstLogin open={cancelLogin}/>}

    </div>
  )
};

export default ImageCompressor;
