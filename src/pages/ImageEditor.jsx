import React, { useEffect, useRef, useState, useCallback } from "react";
import { Navigate,useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { GrUndo } from "react-icons/gr";
import { GrRedo } from "react-icons/gr";

// editing tools icons
import { MdCropFree, MdCropRotate } from "react-icons/md";
import { RiColorFilterFill } from "react-icons/ri";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoText } from "react-icons/io5";
//aspect ratio icons
import { BiRectangle } from "react-icons/bi";
import { LuRectangleHorizontal } from "react-icons/lu";
import { LuRectangleVertical } from "react-icons/lu";
import { TbRectangleVertical } from "react-icons/tb";
import { MdOutlineRotate90DegreesCw } from "react-icons/md";

import { Tooltip } from "react-tooltip";

import Cropper from "react-easy-crop";
import getCroppedImg from "../components/cropImage";


const ImageEditor = () => {
  const navigat = useNavigate();

  const [canvasSize,setCanvasSize] = useState({width:600,height:400})

  const canvasRef = useRef(null);
  const [image, setImage] = useState(null); 
  const [ogImage,setOgImage] = useState(null);
  const [lastImage,setLastImage] = useState(null);
  const [croppedImage,setCroppedImage] = useState(null);

  const [crop,setCrop] = useState({x:0,y:0})
  const [aspect,setAspect] = useState(1);
  const [zoom,setZoom] = useState(null)
  const [croppedAreaPixels,setCroppedAreaPixels] = useState(null)
  const [isCropping, setIsCropping] = useState(false)

  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(1);
  const [flipY, setFlipY] = useState(1);

  const [filters, setFilters] = useState({
  brightness: 100,
  contrast: 100,
  saturation: 100,
  grayscale: 0,
  blur: 0,
  opacity: 100,
  sepia: 0,
  hue: 0,
  invert: 0
});

const updateFilter = useCallback((newFilters) => {
  setFilters({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    grayscale: 0,
    blur: 0,
    opacity: 100,
    sepia: 0,
    hue: 0,
    invert: 0,
    ...newFilters, 
  });
},[]);

  const [text, setText] = useState("");
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [textSize, setTextSize] = useState(20);
  const [textColor, setTextColor] = useState("#000000");
  const isDragging = useRef(false);

  const [updatedImage, setUpdatedImage] = useState(null);
  const [history,setHistory] = useState([]);
  const [historyIndex,setHistoryIndex] = useState(-1);

  // Handle image file selection
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem("uploadedImage", reader.result);
        setImage(reader.result);
      }
      reader.readAsDataURL(file);
    }
  };

    const updateCanvasSize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      // Small screens (Mobile)
      setCanvasSize({ width: 370, height:1000 });
    } else {
      // Larger screens
      setCanvasSize({ width: 600, height: 400 });
    }
  };

    useEffect(() => {
      updateCanvasSize();
         window.addEventListener("resize", updateCanvasSize);
         const storedImage = localStorage.getItem("uploadedImage");
         if (storedImage) {
           setImage(storedImage);
           setOgImage(storedImage);
           // console.log("Image Data:", storedImage);
      return () => window.removeEventListener("resize", updateCanvasSize);
    }
  }, []);

  let imgWidth;
  let imgHeight;
  let canvasWidth;
  let canvasHeight;

  useEffect(() => {
    if (!image) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const img = new Image();
    img.src = image; 
    img.onload = function () {
      imgWidth = img.width;
      imgHeight = img.height;
      const scaleWidth = Math.min(canvasSize.width / imgWidth, 1); // Ensures max width 600px
      const scaleHeight = Math.min(canvasSize.height / imgHeight, 1); // Ensures max height 1200px
      const scale = Math.min(scaleWidth, scaleHeight);
      imgWidth *= scale;
      imgHeight *= scale;
      canvasWidth = Math.max(imgWidth, canvasSize.width == 600 ? 500 : 100);
      canvasHeight = Math.max(imgHeight, canvasSize.height == 400 ? 500 : 300);
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.save();
      ctx.translate(canvasWidth/2, canvasHeight/2);
      ctx.rotate((rotation * Math.PI) / 180);
   ctx.filter = `
  brightness(${filters.brightness}%)
  contrast(${filters.contrast}%)
  saturate(${filters.saturation}%)
  grayscale(${filters.grayscale}%)
  blur(${filters.blur}px)
  sepia(${filters.sepia}%)
  hue-rotate(${filters.hue}deg)
  opacity(${filters.opacity}%)
  invert(${filters.invert}%)
`;
      ctx.drawImage(img, -canvasWidth/2, -canvasHeight/2, canvasWidth, canvasHeight);
      drawText(ctx);
      ctx.restore();
    };

       const timeout = setTimeout(() => {
      saveToHistory();
  }, 500);

   return () => clearInterval(timeout);

  }, [image,croppedImage, text, textPosition, textColor, textSize ,rotation,flipX,flipY,filters]);

    const saveToHistory = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d",  { willReadFrequently: true });
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); // Store ImageData
    const lastImageUrl = canvas.toDataURL();
    setLastImage(lastImageUrl);
    localStorage.setItem("lastImage",lastImage);
    const newHistory = history.slice(0, historyIndex + 1); // Remove future redo states
    newHistory.push(imageData);
    newHistory.length > 10 && newHistory.shift();     
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };
const handleUndo = () => {
  setHistoryIndex(prevIndex => {
    if (prevIndex > 0) {
      console.log(`Undo: Moving from index ${prevIndex} to ${prevIndex - 1}`);
      restoreCanvas(history[prevIndex - 1]); 
      return prevIndex - 1;
    }
    console.log("Undo: already");
    return prevIndex;
  });
};
const handleRedo = () => {
  setHistoryIndex(prevIndex => {
    if (prevIndex < history.length - 1) {
    console.log(`Redo: Moving from index ${prevIndex} to ${prevIndex + 1}`)
      restoreCanvas(history[prevIndex + 1]);
      return prevIndex + 1;
    }
    console.log("Redo: already");
    return prevIndex;
  });
};
  const restoreCanvas = (imageData) => {
    if (!imageData) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.putImageData(imageData, 0, 0); // Restore canvas state
    console.log(imageData);
  };




    useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "z" || event.key === "Z") {
        event.preventDefault();
        handleUndo();
      } else if (event.ctrlKey && event.key === "y" || event.key === "Y") {
        event.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [historyIndex, history]);

  const drawText = (ctx) => {
    ctx.font = `${textSize}px Arial`;
    ctx.fillStyle = textColor;
    ctx.textBaseline = "top";
    ctx.fillText(text, textPosition.x, textPosition.y);
  };

    const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    if (
      offsetX >= textPosition.x &&
      offsetX <= textPosition.x + textSize * text.length &&
      offsetY >= textPosition.y &&
      offsetY <= textPosition.y + textSize
    ) {
      isDragging.current = true;
    }
    console.log(isDragging);
    console.log(rect);
  };

    const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setTextPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

    const handleMouseUp = () => {
    isDragging.current = false;
  };

 
   const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    if (!image || !croppedAreaPixels) return;
  try {
    const croppedImg = await getCroppedImg(ogImage, croppedAreaPixels);
    setImage(croppedImg);
    setIsCropping(false);
  } catch (error) {
    console.error("Error cropping image:", error);
  }
  toggleFeature("crop");
  };


  const [togCrop,setTogCrop] = useState(false)
  const [togRotate,setTogRotate] = useState(false)
  const [togFilter,setTogFilter] = useState(false)
  const [togLight,setTogLight] = useState(false)
  const [togText,setTogText] = useState(false)
  const toggleFeature = (feature) =>{
    setTogCrop(feature === "crop" ? !togCrop : false);
    setTogRotate(feature === "rotate" ? !togRotate : false);
    setTogFilter(feature === "filter" ? !togFilter : false);
    setTogLight(feature === "light" ? !togLight : false);
    setTogText(feature === "text" ? !togText : false);
  }

  
  // download functionality
  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = canvasRef.current.toDataURL("image/png");
    link.download = "edited-image.png";
    link.click();
};


  return (
    <div>
    <nav className="bg-gray-900 text-white px-3 py-3  md:px-6 md:py-4 flex justify-between items-center">
      <ul className="w-full flex space-x-4 justify-between items-center">
        <div>
        <li onClick={()=>{navigat(-1); localStorage.setItem("uploadedImage","")}}><a className="hover:text-gray-400 text-lg md:text-2xl"><FaArrowLeft/></a></li>
        </div>
        <div className="flex gap-2 md:gap-5">
        <button data-tooltip-id="undo-tip" onClick={handleUndo} className={`border-2 p-[6px] cursor-pointer rounded-lg text-lg md:text-2xl ${historyIndex >= 1 ? 'text-white' : 'text-gray-400'} hover:text-gray-400`} title="Undo (ctrl + Z)"><div><GrUndo /></div></button>
        <button data-tooltip-id="redo-tip" onClick={handleRedo} className={`border-2 p-[6px] cursor-pointer rounded-lg text-lg md:text-2xl ${historyIndex < history.length - 1 ? 'text-white' : 'text-gray-400'} hover:text-gray-400`} title="Undo (ctrl + Y)"><div><GrRedo /></div></button>
        <Tooltip id="undo-tip" place="top">Undo (Ctrl + Z)</Tooltip>
        <Tooltip id="redo-tip" place="top">Redo (Ctrl + Y)</Tooltip>
        </div>
        <div className="flex gap-2 md:gap-12 font-bold">
        <li onClick={downloadImage}><a href="#crop" className="border-2 border-black bg-yellow-400 hover:text-white text-sm md:text-lg px-2 md:px-3 py-2 rounded-lg text-black">Download</a></li>
        <li><a href="#download" className="border-2 border-black bg-blue-600 text-white hover:text-gray-950 text-sm md:text-lg px-2 md:px-3 py-2 rounded-lg">Sign in</a></li>
        </div>
      </ul>
    </nav>


    {
      !image &&  (  
    <div className="flex flex-col items-center justify-center gap-4 bg-white min-h-[80vh]">
     <h1 className="text-2xl font-bold">Image Editor</h1>
      <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
        Upload Image
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label> 
      </div>
)}

      { image &&
      <div className="h-[93vh] w-full flex flex-col-reverse md:flex-row justify-between gap-2 overflow-y-hidden">
      <div className="md:w-[1200px] bg-gray-100 py-5 flex relative px-4">
      <ul className="flex md:flex-col items-center gap-8 overflow-x-scroll md:overflow-x-hidden">
        <li onClick={()=>toggleFeature("crop")} className={`flex flex-col justify-center w-fit items-center hover:bg-gray-200 ${togCrop && "bg-gray-200"} px-[12px] py-[6px] rounded-lg cursor-pointer`}><button onClick={()=>toggleFeature("crop")} className={`text-2xl md:text-4xl ${togCrop && "text-blue-700"}`}><MdCropFree /></button><p>Crop</p></li>
        <li onClick={()=>toggleFeature("rotate")} className={`flex flex-col justify-center w-fit items-center hover:bg-gray-200 ${togRotate && "bg-gray-200"} px-[8px] py-[6px] rounded-lg cursor-pointer`}><button  className={`text-2xl md:text-4xl ${togRotate && "text-blue-700"}`}><MdCropRotate /></button><p>Rotate</p></li>
        <li onClick={()=>toggleFeature("filter")} className={`flex flex-col justify-center w-fit items-center hover:bg-gray-200 ${togFilter && "bg-gray-200"} px-[8px] py-[6px] rounded-lg cursor-pointer`}><button  className={`text-2xl md:text-4xl ${togFilter && "text-blue-700"}`}><RiColorFilterFill /></button><p>Filters</p></li>
        <li onClick={()=>toggleFeature("light")} className={`flex flex-col justify-center w-fit items-center hover:bg-gray-200 ${togLight && "bg-gray-200"} px-[8px] py-[6px] rounded-lg cursor-pointer`}><button  className={`text-2xl md:text-4xl ${togLight && "text-blue-700"}`}><HiAdjustmentsHorizontal /></button><p>Lights</p></li>
        <li onClick={()=>toggleFeature("text")} className={`flex flex-col justify-center w-fit items-center hover:bg-gray-200 ${togText && "bg-gray-200"} px-[10px] py-[6px] rounded-lg cursor-pointer`}><button  className={`text-2xl md:text-4xl ${togText && "text-blue-700"}`}><IoText /></button><p>Text</p></li>
        <li></li>
      </ul>
      <ul>
      {/* h-full w-[400px] flex flex-col bg-white absolute shadow-lg rounded-lg px-5 py-10 top-5 ${togCrop ? "left-20" : "-left-120 z-10"} */}
        <div className={`md:h-[500px] w-full md:w-[400px] flex flex-col bg-white absolute shadow-lg rounded-lg px-2 md:px-5 py-4 md:py-10 left-0 md:top-5 ${togCrop ? "-top-50 md:left-22" : "top-50 md:-left-120"}`}>
            <ul className="flex flex-wrap gap-4 md:gap-10 justify-center items-center">
            <button onClick={()=>{setIsCropping(true); toggleFeature("crop")}} className="bg-blue-500 hover:bg-blue-600 text-white hover:cursor-pointer border-gray-400 border-1 hover:border-gray-700 w-full py-1 md:py-2 rounded-sm md:font-semibold">Crop Image</button>
              <div className="flex md:flex-wrap gap-8 md:gap-6  overflow-x-scroll md:overflow-hidden px-6">
              <li onClick={()=>{setIsCropping(true); setAspect(1)}} className="flex flex-col items-center font-mono"><div className="text-3xl md:text-4xl border-2 hover:border-blue-400 rounded-sm border-gray-300 px-3 py-2 md:px-6 md:py-5 justify-center "><BiRectangle/></div><p className="text-lg">1:1</p></li>
              <li onClick={()=>{setIsCropping(true); setAspect(4/3)}} className="flex flex-col items-center font-mono"><div className="text-3xl md:text-4xl border-2 hover:border-blue-400 rounded-sm border-gray-300 px-3 py-2 md:px-6 md:py-5 justify-center "><TbRectangleVertical/></div><p className="text-lg">4:3</p></li>
              <li onClick={()=>{setIsCropping(true); setAspect(16/9)}} className="flex flex-col items-center font-mono"><div className="text-3xl md:text-4xl border-2 hover:border-blue-400 rounded-sm border-gray-300 px-3 py-2 md:px-6 md:py-5 justify-center "><LuRectangleVertical/></div><p className="text-lg">16:9</p></li>
              <li onClick={()=>{setIsCropping(true); setAspect(9/16)}} className="flex flex-col items-center font-mono"><div className="text-3xl md:text-4xl border-2 hover:border-blue-400 rounded-sm border-gray-300 px-3 py-2 md:px-6 md:py-5 justify-center "><LuRectangleHorizontal/></div><p className="text-lg">9:16</p></li>
              <li onClick={()=>{setIsCropping(true); setAspect(5/4)}} className="flex flex-col items-center font-mono"><div className="text-3xl md:text-4xl border-2 hover:border-blue-400 rounded-sm border-gray-300 px-3 py-2 md:px-6 md:py-5 justify-center "><LuRectangleVertical/></div><p className="text-lg">5:4</p></li>
              <li onClick={()=>{setIsCropping(true); setAspect(2/3)}} className="flex flex-col items-center font-mono"><div className="text-3xl md:text-4xl border-2 hover:border-blue-400 rounded-sm border-gray-300 px-3 py-2 md:px-6 md:py-5 justify-center "><BiRectangle/></div><p className="text-lg">2:3</p></li>
              </div>
              <button onClick={()=>setImage(ogImage)} className="bg-yellow-300 hover:cursor-pointer border-2 border-gray-400 hover:border-gray-500 text-black w-full py-1 md:py-2 rounded-sm md:font-semibold">Reset Ratio</button>
            </ul>
        </div>
        {/* h-full w-[400px] bg-white absolute shadow-lg rounded-lg px-3 py-3 top-5 ${togRotate ? "left-20" : "-left-120 z-10"} */}
        <div className={`md:h-[500px] w-full md:w-[400px] bg-white absolute shadow-lg rounded-lg px-2 md:px-6 py-2 md:py-8 left-0 md:top-5 ${togRotate ? "-top-48 md:left-22" : "top-50 md:-left-120"}`}>
          <ul className="flex flex-col">
            <li>
            <input type="range" value={rotation} min={-180} max={180} step={1} onChange={(e) => setRotation(Number(e.target.value))}/>
            <p className="text-center text-lg md:text-xl  text-gray-700">{rotation}°</p>
            </li>
          <div className="md:gap-6 border-t-2 border-gray-300 pt-6 text-center">
            <button onClick={()=> setRotation(prev => {
     const allowedAngles = [-180, -90, 0, 90, 180]; // Allowed rotation angles
    let closest = allowedAngles.reduce((a, b) => Math.abs(b - prev) < Math.abs(a - prev) ? b : a);
    let nextRotation;
    if (closest === 180) nextRotation = -90;
    else nextRotation = allowedAngles[(allowedAngles.indexOf(closest) + 1) % allowedAngles.length];
    return nextRotation;
             })} 
             className="px-3 md:px-8 py-2 md:text-2xl md:py-3 md:font-semibold border-1 border-gray-600 hover:border-blue-400 hover:cursor-pointer focus:border-blue-400 bg-gray-100 rounded-lg"><MdOutlineRotate90DegreesCw/></button>            
            </div>
          <div className="grid grid-cols-3 gap-3 md:gap-6 my-3 md:my-6 border-b-2 border-t-2 border-gray-300 py-4 md:py-8">
            <button onClick={()=>setRotation(-60)} className="px-3 md:px-4 py-2 md:py-3 md:font-semibold border-1 border-gray-600 hover:border-blue-400 hover:cursor-pointer focus:border-blue-400 bg-gray-100 rounded-lg">-60°</button>
            <button onClick={()=>setRotation(-90)} className="px-3 md:px-4 py-2 md:py-3 md:font-semibold border-1 border-gray-600 hover:border-blue-400 hover:cursor-pointer focus:border-blue-400 bg-gray-100 rounded-lg">-90°</button>
            <button onClick={()=>setRotation(45)} className="px-3 md:px-4 py-2 md:py-3 md:font-semibold border-1 border-gray-600 hover:border-blue-400 hover:cursor-pointer focus:border-blue-400 bg-gray-100 rounded-lg">45°</button>
            <button onClick={()=>setRotation(60)} className="px-3 md:px-4 py-2 md:py-3 md:font-semibold border-1 border-gray-600 hover:border-blue-400 hover:cursor-pointer focus:border-blue-400 bg-gray-100 rounded-lg">+60°</button>
            <button onClick={()=>setRotation(90)} className="px-3 md:px-4 py-2 md:py-3 md:font-semibold border-1 border-gray-600 hover:border-blue-400 hover:cursor-pointer focus:border-blue-400 bg-gray-100 rounded-lg">+90°</button>
            <button onClick={()=>setRotation(180)} className="px-3 md:px-4 py-2 md:py-3 md:font-semibold border-1 border-gray-600 hover:border-blue-400 hover:cursor-pointer focus:border-blue-400 bg-gray-100 rounded-lg">+180°</button>
        </div> 
            <button onClick={()=>setRotation(0)} className="w-full py-1 md:py-2 md:font-semibold border-1 border-gray-400 hover:border-gray-700 hover:cursor-pointer bg-yellow-300 rounded-lg">Reset Rotation</button>
          </ul>
        </div>
        <div className={`md:h-[500px] w-full md:w-[400px] bg-white absolute shadow-lg rounded-lg px-3 md:px-6 py-3 md:py-6 left-0 md:top-5 overflow-x-scroll md:overflow-x-hidden ${togFilter ? "-top-16 md:left-22" : "top-50 md:-left-120"}`}>
          <ul className="flex md:flex-col gap-6">
            <li onClick={()=>{updateFilter({brightness:110,constrast:80,saturation:120})}}><p>filter1</p></li>
            <li onClick={()=>{updateFilter({brightness:90,constrast:120,saturation:120})}}><p>filter2</p></li>
    <li onClick={() => updateFilter({ grayscale: 100 })}><p>B&W</p></li>
    <li onClick={() => updateFilter({ invert: 100 })}><p>Invert</p></li>
    <li onClick={() => updateFilter({ sepia: 80, contrast: 110, brightness: 90 })}><p>Vintage</p></li>
    <li onClick={() => updateFilter({ hue: 220, contrast: 120, saturation: 150 })}><p>Cool Tone</p></li>
    <li onClick={() => updateFilter({ hue: -20, contrast: 120, saturation: 140 })}><p>Warm Tone</p></li>
    <li onClick={() => updateFilter({ brightness: 130, contrast: 110, blur: 2 })}><p>Soft Glow</p></li>
    <li onClick={() => updateFilter({ contrast: 200, brightness: 80, saturate: 150 })}><p>Cinematic</p></li>
    <li onClick={() => updateFilter({ brightness: 80, saturation: 50, sepia: 60 })}><p>Retro</p></li>
    <li onClick={() => updateFilter({ contrast: 130, invert: 20, hue: 180 })}><p>Cyberpunk</p></li>
    <li onClick={() => updateFilter({ blur: 4, opacity: 70 })}><p>Dreamy</p></li>
          </ul>
        </div>
        <div className={`h-[200px] md:h-[500px] w-full md:w-[400px] bg-white absolute shadow-lg rounded-lg px-3 md:px-6 py-3 md:py-6 overflow-y-scroll md:overflow-y-hidden left-0 md:top-5 ${togLight ? "-top-48 md:left-22" : "top-50 md:-left-120"}`}>
        <ul className="flex flex-col gap-4">
          <li><p>Brightness</p>
            <input type="range" min="20" max="200" value={filters.brightness} onChange={(e) => setFilters({...filters, brightness: Number(e.target.value)})}/>
            </li>
            <li><p>Contrast</p>
            <input type="range" min="20" max="200" value={filters.contrast} onChange={(e) => setFilters({...filters, contrast: Number(e.target.value)})}/>
            </li>
            <li><p>Saturation</p>
            <input type="range" min="20" max="200" value={filters.saturation} onChange={(e) => setFilters({...filters, saturation: Number(e.target.value)})}/>
            </li>
            <li><p>Grayscale</p>
            <input type="range" min="20" max="200" value={filters.grayscale} onChange={(e) => setFilters({...filters, grayscale: Number(e.target.value)})}/>
            </li>
            <li><p>Hue</p>
            <input type="range" min="20" max="200" value={filters.hue} onChange={(e) => setFilters({...filters, hue: Number(e.target.value)})}/>
            </li>
        </ul>
        </div>
        <div className={`h-full w-[400px] bg-white absolute shadow-lg rounded-lg px-3 py-3 top-5 ${togText ? "left-20" : "-left-120"}`}>
          <div className="mt-4 flex flex-col items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-2 border border-gray-400"
          placeholder="Enter text"
        />
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="mt-2"
        />
        <input
          type="range"
          min="10"
          max="50"
          value={textSize}
          onChange={(e) => setTextSize(parseInt(e.target.value))}
          className="mt-2"
        />
      </div>
        </div>
      </ul>
      </div>
      {
      image &&
      <div className="p-4 bg-white w-full overflow-y-scroll">
        <canvas ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp} 
        className="border rounded-md" />
      </div>
      }
      {isCropping && image && (
        <div className="">
          <Cropper
            image={ogImage}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(onCropComplete)}
            zoomSpeed={0.1}
            showGrid={true}
          />
          <div className="absolute bottom-16 right-30 flex gap-4">
            <button onClick={handleCrop} className="bg-blue-500 px-3 py-2 text-white">Apply Crop</button>
            <button onClick={()=>setIsCropping(false)} className="bg-red-500 text-white py-2 px-3">Cancel</button>
          </div>
        </div>
      )}
      </div>
    }
    </div>
  );
};

export default ImageEditor;




// // import React, { useRef, useState } from "react";

// // const ImageEditor = () => {
// //   const [image, setImage] = useState(null);
// //   const [text, setText] = useState("");
// //   const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
// //   const [textSize, setTextSize] = useState(16);
// //   const [textColor, setTextColor] = useState("black");
// //   const [cropping, setCropping] = useState(false);
// //   const [cropArea, setCropArea] = useState({ x: 50, y: 50, width: 200, height: 200 });
// //   const canvasRef = useRef(null);

// //   const handleImageUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onload = () => setImage(reader.result);
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleMouseDown = (e) => {
// //     const startX = e.clientX;
// //     const startY = e.clientY;

// //     const onMouseMove = (event) => {
// //       setTextPosition((prev) => ({
// //         x: prev.x + event.movementX,
// //         y: prev.y + event.movementY,
// //       }));
// //     };

// //     const onMouseUp = () => {
// //       document.removeEventListener("mousemove", onMouseMove);
// //       document.removeEventListener("mouseup", onMouseUp);
// //     };

// //     document.addEventListener("mousemove", onMouseMove);
// //     document.addEventListener("mouseup", onMouseUp);
// //   };

// //   const handleCropMouseDown = (e) => {
// //     e.preventDefault();
// //     const startX = e.clientX;
// //     const startY = e.clientY;

// //     const onMouseMove = (event) => {
// //       setCropArea((prev) => ({
// //         ...prev,
// //         x: prev.x + event.movementX,
// //         y: prev.y + event.movementY,
// //       }));
// //     };

// //     const onMouseUp = () => {
// //       document.removeEventListener("mousemove", onMouseMove);
// //       document.removeEventListener("mouseup", onMouseUp);
// //     };

// //     document.addEventListener("mousemove", onMouseMove);
// //     document.addEventListener("mouseup", onMouseUp);
// //   };

// //   return (
// //     <div className="flex flex-col items-center p-4">
// //       <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
// //       <div className="relative w-[500px] h-[500px] border border-gray-300">
// //         {image && <img src={image} alt="Uploaded" className="w-full h-full object-cover" />}
// //         {cropping && (
// //           <div
// //             className="absolute border border-dashed border-red-500 resize overflow-hidden"
// //             style={{
// //               left: cropArea.x,
// //               top: cropArea.y,
// //               width: cropArea.width,
// //               height: cropArea.height,
// //             }}
// //             onMouseDown={handleCropMouseDown}
// //           />
// //         )}
// //         <div
// //           className="absolute cursor-move"
// //           style={{ left: textPosition.x, top: textPosition.y, fontSize: textSize, color: textColor }}
// //           onMouseDown={handleMouseDown}
// //         >
// //           {text}
// //         </div>
// //       </div>
// //       <input
// //         type="text"
// //         placeholder="Enter text"
// //         value={text}
// //         onChange={(e) => setText(e.target.value)}
// //         className="mt-4 p-2 border border-gray-400"
// //       />
// //       <input
// //         type="color"
// //         value={textColor}
// //         onChange={(e) => setTextColor(e.target.value)}
// //         className="mt-2"
// //       />
// //       <input
// //         type="range"
// //         min="10"
// //         max="50"
// //         value={textSize}
// //         onChange={(e) => setTextSize(parseInt(e.target.value))}
// //         className="mt-2"
// //       />
// //       <button onClick={() => setCropping(!cropping)} className="mt-4 p-2 bg-blue-500 text-white">
// //         Toggle Crop
// //       </button>
// //     </div>
// //   );
// // };

// // export default ImageEditor;

