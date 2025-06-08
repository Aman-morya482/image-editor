import { useContext, useEffect, useRef, useState } from 'react'
import { userContext } from '../utils/ContextProvider';
import ReactCompareImage from 'react-compare-image';
import gsap from 'gsap';
import FirstLogin from '../components/FirstLogin';
import { IoIosArrowBack } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";

const ImageEnhancer = () => {
  const [image, setImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [format, setFormat] = useState("image/jpeg");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 })
  const enhanceRef = useRef();
  const { user } = useContext(userContext);

  useEffect(() => {
    gsap.fromTo(enhanceRef.current, { y: "15%", opacity: 0 }, {
      y: "0%",
      opacity: 1,
      duration: 1,
      ease: "power1.inOut"
    });
  }, [])

  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) { setCanvasSize({ width: 250, height: 300 }) }
    else { setCanvasSize({ width: 500, height: 500 }) }
  }, [])

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    setTimeout(() => {
      const reader = new FileReader();
      reader.onloadend = () => { setImage(reader.result) }
      reader.readAsDataURL(file);
      setLoading(false)
    }, 1200);
  }

  const makeEnhanced = (imageSrc) => {
    setLoading(true);
    const img = new window.Image();
    img.crossOrigin = "anonymous"; // Needed if image is from different origin
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Set canvas size to image size (no resize)
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Get image data
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let data = imageData.data;

      // === Brightness, Saturation, and Contrast Enhancement ===
      for (let i = 0; i < data.length; i += 4) {
        // Brightness
        data[i] += 20;     // R
        data[i + 1] += 20; // G
        data[i + 2] += 20; // B

        // Saturation
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const avg = (r + g + b) / 3;
        const saturation = 1.2;
        data[i] = avg + (r - avg) * saturation;
        data[i + 1] = avg + (g - avg) * saturation;
        data[i + 2] = avg + (b - avg) * saturation;

        // Contrast
        const contrast = 1.2;
        data[i] = contrast * (data[i] - 128) + 128;
        data[i + 1] = contrast * (data[i + 1] - 128) + 128;
        data[i + 2] = contrast * (data[i + 2] - 128) + 128;
      }

      // Put modified data back
      ctx.putImageData(imageData, 0, 0);

      // Get Base64 image
      const base64 = canvas.toDataURL();

      // Use the base64 string in your app
      setTimeout(() => { setEnhancedImage(base64); setLoading(false)},2000)
    };

    img.src = imageSrc; // pass your source image URL or base64
  };


  const handleBack = () => {
    if (enhancedImage) { setEnhancedImage(null) }
    else { setImage(null) }
  }


  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new window.Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const link = document.createElement("a");
      link.download = `enhanced.${format.split("/")[1]}`;
      link.href = canvas.toDataURL(format);
      !user && setLogin(true);
      const imageData = canvas.toDataURL(format);
      if (!user) return pendingImage(imageData.split(',')[1]);
      user && link.click();
    };
    img.src = enhancedImage;
  };

  const pendingImage = (url) => {
    const item = { image: url, format: format.split("/")[1], name: "enhanced-image", expiry: 86400000 }
    localStorage.setItem("pendingImage", JSON.stringify(item))
  }

  const cancelLogin = () => { setLogin(false) }
  const changeFormat = (e) => { setFormat(e.target.dataset.format); setOpen(false); }

  return (
    <div className='gird grid-cols-1 place-items-center bg-white'>

      {!image && !enhancedImage && (
        <div className="relative max-w-[1800px] w-full min-h-[92vh] bg-rose-200 flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col justify-center items-center relative mb-20">
            <h2 ref={enhanceRef} className="text-4xl md:text-7xl font-bold text-center mb-4">Image Enhancer</h2>
          <span className='hidden xl:block'><img src="/png/014-filter.png" alt="" width={130} className='absolute -top-20 right-60 float-svg' /></span>
          <span className='hidden xl:block'><img src="/png/025-ai-art.png" alt="" width={110} className='absolute -bottom-20 left-50 scale-svg' /></span>
            <h3 className="mb-8 text-rose-600 text-center px-2 font-semibold text-lg">Transform low-quality images into crisp, vibrant ones.</h3>

            <div className="group flex flex-col items-center justify-center">
              <label title='Uploade your image' className="bg-rose-500 text-white md:font-bold w-xs md:w-2xl ring-red-300 hover:ring-3 text-lg md:text-xl rounded-full py-3 md:p-5 text-center cursor-pointer active:scale-95">
                {loading ? "Uploading..." : "Upload Image"}
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
              </label>
              <h2 className='mt-6 text-lg font-semibold text-gray-600 text-center'>⚡ Boost your image quality in seconds. No editing skills required.</h2>
            </div>
          </div>
        </div>
      )}

      {
        !enhancedImage && image && (
          <div className="max-w-[1800px] w-full min-h-[92vh] bg-rose-300 flex flex-col justify-center items-center relative">
            <div className='w-3/4 flex flex-col bg-white my-10 gap-20 md:gap-10 justify-center items-center py-10 overflow-hidden'>
              <div className='relative flex justify-between w-4/5'>
                <button onClick={handleBack} className='flex items-center border-gray-400 border-2 gap-1 rounded-md px-3 py-2 cursor-pointer active:scale-95'><IoIosArrowBack size={14} />Back</button>
                <button className='flex items-center bg-rose-500 ring-red-300 hover:ring-3 active:scale-95 rounded-md py-2 text-white cursor-pointer'><p onClick={() => makeEnhanced(image)} className='px-2'>{!loading ? "Enhance Now" : "Processing..."}</p></button>
                <div className={`absolute right-0 top-10 z-10 w-[80px] ${open ? 'opacity-100' : 'opacity-0'}`}>
                  <ul className='flex flex-col bg-gray-200 border border-gray-200 rounded-md'>
                    <li onClick={(e) => { changeFormat(e) }} data-format="image/jpeg" className={`hover:bg-gray-300 px-3 py-2 ${format === "image/jpeg" ? 'bg-gray-300' : 'bg-gray-200'}`}>JPEG</li>
                    <li onClick={(e) => { changeFormat(e) }} data-format="image/png" className={`hover:bg-gray-300 px-3 py-2 ${format === "image/png" ? 'bg-gray-300' : 'bg-gray-200'}`}>PNG</li>
                    <li onClick={(e) => { changeFormat(e) }} data-format="image/webp" className={`hover:bg-gray-300 px-3 py-2 ${format === "image/webp" ? 'bg-gray-300' : 'bg-gray-200'}`}>WEBP</li>
                  </ul>
                </div>
              </div>
              <div className='w-[240px] h-[240px] object-contain md:w-[500px] md:h-[500px] border overflow-hidden rounded-md'>
                <img src={image} alt="" className='object-contain object-center' />
              </div>

              {login && <FirstLogin open={cancelLogin} />}
            </div>
          </div>
        )}

      {enhancedImage && image && (
        <div className="max-w-[1800px] bg-rose-300 w-full min-h-[92vh] flex flex-col justify-center items-center relative">
          <div className='w-3/4 bg-white flex flex-col gap-20 md:gap-10 justify-center items-center py-10 my-10'>
            <div className='relative flex justify-between w-4/5'>
              <button onClick={handleBack} className='flex items-center border border-gray-400 border-2 gap-1 rounded-md px-3 py-2 cursor-pointer active:scale-95'><IoIosArrowBack size={14} />Back</button>
              <button className='flex items-center bg-rose-500 ring-red-300 hover:ring-3 rounded-md  text-white cursor-pointer'><p onClick={handleDownload} className='border-r px-2 active:scale-90'>Download</p><span className='mb-1 p-2' onClick={() => { setOpen(!open) }}><FaAngleDown size={16} /></span></button>
              <div className={`absolute right-0 top-10 z-10 w-[80px] ${open ? 'opacity-100' : 'opacity-0'}`}>
                <ul className='flex flex-col bg-gray-200 border border-gray-200 rounded-md'>
                  <li onClick={(e) => { changeFormat(e) }} data-format="image/jpeg" className={`hover:bg-gray-300 px-3 py-2 ${format === "image/jpeg" ? 'bg-gray-300' : 'bg-gray-200'}`}>JPEG</li>
                  <li onClick={(e) => { changeFormat(e) }} data-format="image/png" className={`hover:bg-gray-300 px-3 py-2 ${format === "image/png" ? 'bg-gray-300' : 'bg-gray-200'}`}>PNG</li>
                  <li onClick={(e) => { changeFormat(e) }} data-format="image/webp" className={`hover:bg-gray-300 px-3 py-2 ${format === "image/webp" ? 'bg-gray-300' : 'bg-gray-200'}`}>WEBP</li>
                </ul>
              </div>
            </div>
            <div className='w-[240px] h-[240px] md:w-[500px] md:h-[500px] border overflow-hidden rounded-md'>
              <ReactCompareImage
                leftImage={image}
                rightImage={enhancedImage}
                containerStyle={{
                  width: "100%",
                  height: "100%",
                }}
                leftImageCss={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain"
                }}
                rightImageCss={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain"
                }}
              />
            </div>

            {login && <FirstLogin open={cancelLogin} />}
          </div>
        </div>
      )}

    </div>
  )
}

export default ImageEnhancer