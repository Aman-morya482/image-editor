import { useState, useEffect, useRef, useContext } from 'react'
import ReactCompareImage from "react-compare-image";
import gsap from "gsap";
import { userContext } from "../utils/ContextProvider";

import { LuUpload } from "react-icons/lu";
import { IoIosArrowBack } from 'react-icons/io';
import FirstLogin from '../components/FirstLogin';
import { toast } from 'react-toastify';

const BgRemover = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const { url, user } = useContext(userContext);
  const bgRef1 = useRef(null);
  const bgRef2 = useRef(null);

  useEffect(() => {
    gsap.fromTo(bgRef1.current, { scale: 0.9, opacity: 0 }, {
      y: "0%",
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power1.inOut"
    });
    gsap.fromTo(bgRef2.current, { scale: 0.95, opacity: 0 }, {
      y: "0%",
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power1.inOut"
    });
    gsap.fromTo(".boxRef", { scale: 0.95, opacity: 0 }, {
      y: "0%",
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power1.inOut"
    });
  }, [])

  const handleImageUpload = () => {
    const file = event.target.files[0];
    setResult(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLoading(true)
      setTimeout(() => {
        setImage(reader.result);
        setLoading(false)
      }, 1200)
    }
    reader.readAsDataURL(file);
  }

  const sendToBackend = async () => {
    setLoading(true);
    console.log("BGreq", image.slice(0, 50))
    try {
      const imagePayload = { image: image };

      const response = await fetch(`${url}/image/get-bgRemoved`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imagePayload),
      });
      if (!response.ok) throw new Error('Conversion failed' + response.err);
      const data = await response.json();
      console.log("BGres", data);
      setResult(data.Image);
    } catch (err) {
      console.error('Error:', err);
      toast.error("convertion failed");
    } finally { setLoading(false) }
  };

  const handleBack = () => {
    if (result) { setResult(null) }
    else { setImage(null) }
  }

  const downloadImage = (base64Image, fileName = "bgremoved-image.png") => {
    !user && setLogin(true);
    if (!user) return pendingImage();
    const link = document.createElement("a");
    link.href = base64Image;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pendingImage = () => {
    const img = result.split(",")[1];
    const item = { image: `${img}`, format: "png", name: "Bg-remover-image", expiry: 86400000 }
    localStorage.setItem("pendingImage", JSON.stringify(item))
  }

  return (
    <div className='grid grid-cols-1 place-items-center'>
      {!result && !image &&
        <div className='h-[92vh] w-full max-w-[1800px] bg-yellow-200 flex flex-col-reverse md:flex-row justify-center items-center gap-10 md:gap-5 lg:gap-20 xl:gap-40 p-20 overflow-hidden'>
          <div ref={bgRef1} className='w-xs min-w-xs md:w-lg xl:w-xl shadow-2xl rounded-2xl overflow-hidden'>
            <video src="/img/bg-video.mp4" autoPlay loop className=''></video>
          </div>
          <div className='flex flex-col justify-center items-center gap-6 mb-2'>
            <h1 className='text-3xl md:text-5xl font-bold'><p ref={bgRef2}>Background Remover </p><p className='boxRef text-base mt-4 font-semibold text-center bg-yellow-400 py-1 md:py-2 rounded-lg'>100% Automatically and Free</p></h1>
            <div className='boxRef flex flex-col bg-white/40 justify-center items-center gap-5 border border-gray-600 border-dashed p-6 md:p-18 md:px-26 rounded-2xl'>
              <LuUpload className='text-gray-600 text-5xl md:text-8xl' />
              <div className="group flex justify-center">
                <label onChange={() => handleImageUpload()} className="bg-orange-400 text-white md:font-bold w-2xs md:w-xs ring-yellow-300 hover:ring-3 text-lg md:text-xl rounded-full py-2 md:p-5 text-center cursor-pointer active:scale-95">
                  {loading ? "Uploading..." : "Upload Image"}
                  <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        </div>
      }
      {!result && image && (
        <div className="max-w-[1800px] w-full min-h-[92vh] flex flex-col justify-center items-center relative bg-yellow-200">
          <div className='w-3/4 flex flex-col gap-20 md:gap-10 justify-center items-center py-10 mb-20 md:mb-0 bg-white overflow-hidden'>
            <div className='relative flex justify-between w-4/5'>
              <button onClick={handleBack} className='flex items-center md:text-lg border-2 border-gray-400 gap-1 rounded-md px-3 py-2 cursor-pointer active:scale-95'><IoIosArrowBack size={14} />Back</button>
              <button className='flex items-center bg-orange-400 md:text-lg rounded-md py-2 px-2 md:px-4 text-white active:scale-95 cursor-pointer ring-yellow-200 hover:ring-3'><p onClick={() => sendToBackend()}>{loading ? "Processing..." : "Remove BG"}</p></button>
            </div>
            <div className='w-[240px] h-[240px] md:w-[500px] md:h-[500px] border overflow-hidden'>
              <img src={image} alt="uploaded image" className='w-full h-full' />
            </div>
          </div>
        </div>
      )}
      {result && (
        <div className="max-w-[1800px] w-full min-h-[92vh] flex flex-col justify-center items-center relative bg-yellow-200">
          <div className='w-3/4 flex flex-col gap-20 md:gap-10 justify-center items-center py-10 mb-20 md:mb-0 bg-white'>
            <div className='relative flex justify-between w-4/5'>
              <button onClick={handleBack} className='flex items-center md:text-lg border-2 border-gray-400 gap-1 rounded-md px-3 py-2 cursor-pointer active:scale-95'><IoIosArrowBack size={14} />Back</button>
              <button className='flex items-center bg-orange-400 md:text-lg cursor-pointer active:scale-95 ring-yellow-200 hover:ring-3 rounded-md py-2 px-2 md:px-4 text-white'><p onClick={() => downloadImage(result)}>Download</p></button>
            </div>
            <div className='w-[240px] h-[240px] md:w-[500px] rounded-md md:h-[500px] border overflow-hidden'>
              <ReactCompareImage
                leftImage={image}
                rightImage={result}
                containerStyle={{ width: "100%", height: "100%" }}
                leftImageCss={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
                rightImageCss={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {
        login && <FirstLogin open={setLogin} />
      }
    </div>
  )
}

export default BgRemover;