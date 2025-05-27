import React, { useContext, useState } from 'react';
import axios from 'axios';
import FirstLogin from '../components/FirstLogin';
import { userContext } from '../utils/ContextProvider';
import { IoIosArrowBack } from 'react-icons/io';
import { IoCopyOutline } from "react-icons/io5";
import { LuCopyCheck } from "react-icons/lu";



const ImageDetector = () => {
  const [img, setImg] = useState(null);
  const [description, setDescription] = useState(``);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [login,setLogin] = useState(false);
  const [text,setText] = useState(``);
  const [copy,setCopy] = useState(false);

  const {user} = useContext(userContext);

  const handleFileChange = async (e) => {
    if(!user) setLogin(true);
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await convertToBase64(file);
    setImg(base64);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };


  const sendToBackend = async () => {
    setLoading(true);
    let imageUrl;

       try {
      const formData = new URLSearchParams();
      formData.append("key", "c566d8a130fb6cc14f4fa26b568e003f");
      formData.append("image", img);
      formData.append("expiration", 300);

      const response = await axios.post("https://api.imgbb.com/1/upload", formData.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      imageUrl = response.data?.data?.url;
      setUrl(imageUrl);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed: " + error.message);
      return;
    }


    const payload = {imageData : imageUrl , message: "" };
    console.log("payload",payload)
    console.log("url",imageUrl);
    try {
      const response = await fetch("http://localhost:8080/api/imageReader", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to fetch description");

      const data = await response.json();
      console.log(data.data);
      setDescription(data.data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong! Try again later.");
      setImg(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async()=>{
    setCopy(true);
    await navigator.clipboard.writeText(description);
    setTimeout(()=> setCopy(false) , 3000)
  }


  const cancelLogin = ()=>{
  setLogin(false);
  setImg(null)
}

  return (
    <div className="grid grid-cols-1 place-items-center bg-gray-100 min-h-screen">
      {!img &&(
        <div className={`${!img ? "min-h-[92vh]" : "h-[50vh]"} max-w-[1800px] w-full flex justify-center items-center`}>
        <div className="w-full flex flex-col justify-center items-center px-4">
          <h2 className="text-4xl md:text-7xl font-bold text-center mb-10"
            style={{
              background: "linear-gradient(to right, blue, purple, red)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: "1.3"
            }}>
            AI Image Describer
          </h2>
          <div className="relative group flex justify-center mb-20">
            <label className="bg-blue-600 text-white md:font-bold w-2xs md:w-xl ring-blue-300 hover:ring-2 text-lg md:text-xl rounded-2xl py-2 md:p-5 text-center cursor-pointer">
              Upload Image
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        </div>
      </div>
      )}

      {img && (
        <div className="w-full flex flex-col md:flex-row justify-center items-center mb-20 px-4 md:px-8">
          <div className="flex flex-col items-center justify-center gap-3 m-5">
              <div className='flex justify-between w-full'>
              <button onClick={()=>{setImg(null);setDescription(``)}} className='text-black rounded-md hover:cursor-pointer active:scale-95 border p-1 pr-2 md:text-lg flex gap-1 items-center'><IoIosArrowBack />Back</button>
            {!description &&(
              <button
              onClick={sendToBackend}
              className={`bg-green-600 text-white hover:cursor-pointer ring-green-300 hover:ring-2 rounded-md py-2 px-5 text-center`}>
              {loading ? "Processing..." : "Analyze Image"}
            </button>
            )}
            </div>
            <img src={`data:image/jpeg;base64,${img}`} alt="Uploaded" className={`${description ? "w-[300px] h-[300px] md:w-[400px] md:h-[400px]" : "w-[250px] h-[250px] md:w-[500px] md:h-[450px]"} rounded-md shadow-lg object-cover`} />
          </div>

          {description && !loading && (
            <div className="md:w-3xl w-full m-4 min-h-[300px] tracking-wider bg-white rounded shadow-xl mt-5 md:mt-17 overflow-hidden">
              <div onClick={()=>handleCopy()} className="cursor-pointer w-full bg-yellow-400 px-2 flex justify-between items-center"><p className='px-4 py-2 md:text-xl font-semibold'>Description </p> <p className='flex items-center gap-1 flex-row-reverse p-2 px-4'>{!copy ? <>Copy<IoCopyOutline/></> : <>copied<LuCopyCheck/></> }</p></div>
              <p className="text-sm md:text-base py-6 pb-10 px-6 md:px-8 tracking-wider">{description}</p>
            </div>
          )}
        </div>
      )}

      {login && <FirstLogin open={cancelLogin}/>}
    </div>
  );
};

export default ImageDetector;
