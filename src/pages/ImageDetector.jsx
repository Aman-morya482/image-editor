import { useContext, useEffect, useState, useRef } from 'react';
import { userContext } from '../utils/ContextProvider';
import axios from 'axios';
import FirstLogin from '../components/FirstLogin';

import { IoCopyOutline } from "react-icons/io5";
import { LuCopyCheck } from "react-icons/lu";
import { IoIosArrowBack } from 'react-icons/io';
import { toast } from 'react-toastify';

const ImageDetector = () => {
  const [img, setImg] = useState(null);
  const [message, setmessage] = useState("");
  const [description, setDescription] = useState(``);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const [text, setText] = useState(``);
  const [copy, setCopy] = useState(false);
  const buttonRef = useRef(null)
  const { user, url } = useContext(userContext);

  const handleFileChange = async (e) => {
    if (!user) setLogin(true);
    setLoading(true);
    setmessage("");
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await convertToBase64(file);
    setTimeout(() => { setImg(base64); setLoading(false) }, 1200)
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

      const response = await axios.post(`https://api.imgbb.com/1/upload`, formData.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      imageUrl = response.data?.data?.url;
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed: " + error.message);
      return;
    }


    const payload = { imageData: imageUrl, message: message };
    console.log("payload", payload)
    try {
      const response = await fetch(`${url}/api/imageReader`, {
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
      toast.error("Something went wrong!!");
      setImg(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    setCopy(true);
    await navigator.clipboard.writeText(description);
    setTimeout(() => setCopy(false), 3000)
  }


  const cancelLogin = () => {
    setLogin(false);
    setImg(null)
  }

  const handleEnter = (e) => {
    if (e.key == "Enter") { buttonRef.current.click() }
  }
  useEffect(() => {
    window.addEventListener("keydown", handleEnter)
    return () => { window.removeEventListener("keydown", handleEnter) }
  })

  return (
    <div className="grid grid-cols-1 place-items-center bg-green-200 min-h-screen">
      {!img && (
        <div className={`${!img ? "min-h-[92vh]" : "h-[50vh]"} max-w-[1800px] w-full flex justify-center items-center mb-20`}>
          <div className="relative w-full flex flex-col justify-center items-center px-4">
            <span className='hidden xl:block'><img src="/png/027-artificial-intelligence.png" alt="" width={100} className='absolute -top-25 right-50 float-svg' /></span>
            <span className='hidden xl:block'><img src="/png/009-image-processing.png" alt="" width={100} className='absolute -bottom-10 left-50 scale-svg' /></span>
            <h2 className="text-5xl md:text-7xl font-bold text-center mb-4"
            >
              AI Image Reader
            </h2>
            <h3 className='mb-8 text-emerald-600 font-semibold text-lg text-center'>Read. Detect. Understand — from pixels to meaning.</h3>
            <div className="relative group flex justify-center mb-6">
              <label className="bg-green-500 active:scale-95 text-white md:font-bold w-xs md:w-3xl ring-green-300 hover:ring-4 text-xl font-semibold md:text-xl rounded-full py-4 md:p-5 text-center cursor-pointer">
                {loading ? "Uploading..." : "Upload Image"}
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
            <h1 className='font-semibold text-xl md:text-3xl text-gray-600'>-- Use Cases -- </h1>
            <div className="flex flex-col md:flex-row gap-4 list-none font-semibold text-lg text-gray-700 mt-4">
              <li>Object Detection </li>
              <li className='hidden md:block'>|</li>
              <li>Text Recognition </li>
              <li className='hidden md:block'>|</li>
              <li>Scene Description</li>
            </div>
          </div>
        </div>
      )}

      {img && (
        <div className="w-[90%] md:w-3/4 max-w-[1200px] bg-white flex flex-col xl:flex-row my-10 px-4 py-10 md:px-10 xl:px-10">
          <div className="w-full flex flex-col gap-3">
            <div className='flex justify-between w-full'>
              <button onClick={() => { description ? setDescription(``) : setImg(null) }} className='text-black rounded-md hover:cursor-pointer active:scale-95 border p-1 pr-2 md:text-lg flex gap-1 items-center'><IoIosArrowBack />Back</button>
              {!description && (
                <button
                  ref={buttonRef}
                  onClick={sendToBackend}
                  disabled={loading}
                  className={`bg-green-600 active:scale-95 text-white hover:cursor-pointer ring-green-300 hover:ring-2 rounded-md py-2 px-5 text-center`}>
                  {loading ? "Processing..." : "Analyze Image"}
                </button>
              )}
            </div>
            <div className={`flex flex-col md:flex-row ${!description ? "items-center md:items-start" : "justify-center items-center w-full"} gap-6 mt-6 overflow-hidden`}>
              <img src={`data:image/jpeg;base64,${img}`} alt="Uploaded" className={`${description ? "w-[250px] h-[250px] md:w-[400px] md:h-[400px]" : "w-[250px] h-[250px] md:w-[500px] md:h-[450px]"} border rounded-md shadow-lg object-cover`} />
              {!description && img &&
                <div className='w-full '>
                  <p className='mb-2 text-lg font-semibold '>Do you want any specific description?</p>
                  <textarea type="text" maxLength={80} value={message} onChange={(e) => { setmessage(e.target.value) }} className='w-full border max-h-[100px] min-h-[100px] px-3 py-2' />
                </div>
              }
            </div>
          </div>

          {description && !loading && (
            <div className="w-full min-h-[300px] tracking-wider bg-white rounded shadow-xl mt-5 md:mt-17 overflow-hidden">
              <div onClick={() => handleCopy()} className="cursor-pointer w-full bg-yellow-400 px-2 flex justify-between items-center"><p className='px-4 py-2 md:text-xl font-semibold'>Description </p> <p className='flex items-center gap-1 flex-row-reverse p-2 px-4'>{!copy ? <>Copy<IoCopyOutline /></> : <>copied<LuCopyCheck /></>}</p></div>
              <p className="text-sm md:text-base py-6 pb-10 px-6 md:px-8 tracking-wider">{description}</p>
            </div>
          )}
        </div>
      )}

      {login && <FirstLogin open={cancelLogin} />}
    </div>
  );
};

export default ImageDetector;
