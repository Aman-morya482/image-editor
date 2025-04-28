import React, { useContext, useEffect, useRef, useState } from 'react'
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { gsap } from "gsap";

import { PiMagicWandDuotone } from "react-icons/pi";
import { IoIosArrowRoundDown } from "react-icons/io";
import { FaArrowDownLong } from "react-icons/fa6";

import { userContext } from '../utils/ContextProvider';
import FirstLogin from "../components/FirstLogin";

const TextToImage = () => {

  const {user} = useContext(userContext);

  const [prompt,setPrompt] = useState("");
  const [loading,setLoading] = useState(false);
  const [image,setImage] = useState("");
  const [login,setLogin] = useState(false);
  const buttonRef = useRef(null);
  const [randomPrompts, setRandomPrompts] = useState([]);
const samplePrompts = [  "Neon tiger in jungle 🐯",  "Retro car on beach 🚗",  "Pirate ship in space 🏴‍☠️",  "Penguin enjoying wave 🐧",  "Spaceship flying through storm 🚀",  "Fairy sitting on mushroom 🧚",  "Tiny dragon on shoulder 🐉",  "Ancient castle in rain 🏰",  "Dinosaur eating ice cream 🦖",  "Penguin drinking coffee at cafe ☕",  "Ice castle in forest ❄️",  "Rainbow bridge over mountains 🌈",  "Sunflowers under starry sky 🌻",  "Rainy street with neon lights 🌧️"];
  
  const aiText = useRef(null);

  useEffect(()=>{
  gsap.fromTo(aiText.current, { y: "5%", opacity: 0 , scale:0.94}, {
    y: "0%",
    scale:1,
    opacity: 1,
    duration:0.8,
    ease: "power1.inOut"
  });
  },[])

  useEffect(()=>{
    const shuffled = [...samplePrompts].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    setRandomPrompts(selected);

    const handleEnter = (e)=>{
      if(e.key === "Enter"){
        buttonRef.current.click();
      }
    }
    window.addEventListener("keydown",handleEnter);
    return()=>{window.removeEventListener("keydown",handleEnter)}
  },[])

        const sendToBackend = async () => {
        if (prompt.length <= 0) return alert("Write some prompt");
        setLoading(true);
        
        const style_prompt = "a photo of";
        const negative = "";
        const imp = ["tiger"];
        const scene = ["forest","mountain"];
        
        const imagePayload = {prompt,imp,style_prompt,scene,negative};

        try{
          
          const response = await fetch('http://localhost:8080/api/getImage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imagePayload),
          });
          console.log(imagePayload)
          
          if (!response.ok) throw new Error('Generation failed');
          const data = await response.json();
          setImage(data);
          console.log(data);
          setLoading(false);
        } catch (err) {
          console.error('Error:', err);
          setLoading(false);
          alert("Something went wrong ! Try again after some time.");
        }
      };
      
      const handleDownload = () => {
        if(!user) return pendingImage(); 
        !user && setLogin(true);
      const link = document.createElement("a");
      link.href = `data:image/jpeg;base64,${image}`;
      link.download = "ai-image.jpeg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    const pendingImage = ()=>{
      const item = {image: `${image}`, format:"jpeg", name:"ai-image", expiry: 86400000}
      setLogin(true);
      localStorage.setItem("pendingImage",JSON.stringify(item))
    }

    const cancelLogin = ()=>{
      setLogin(false);
    }
  


  return (
    <div className='gird grid-cols-1 place-items-center'>
      <div className={`${!image ? "h-screen" : "h-[50vh] xl:h-[40vh]"} flex flex-col items-center justify-center gap-4 px-10`}>
        <p ref={aiText} className='text-7xl font-bold tracking-wide text-center animated-gradient-text '>AI Image Generator</p>
        <p className='mb-4 font-semibold text-gray-600 tracking-wide'>Turn your imagination into stunning images powered by AI.</p>
      <div className='flex flex-wrap justify-center items-center gap-2'>
        <input type="text" value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder='What do you want to see?' className='border border-gray-400 rounded-md w-xs sm:w-lg md:w-xl p-3 focus:outline-blue-400 ' />
        <button onClick={sendToBackend} ref={buttonRef} className='p-3 bg-gradient-to-r from-blue-600 via-purple-800 to-red-500 rounded-md text-white ring-blue-300 active:scale-95 hover:ring-2 hover:cursor-pointer flex gap-2 items-center'><PiMagicWandDuotone size={24}/>{loading ? "Processing..." : "Generate Image"}</button>
      </div>
      {!image && (
      <div className="flex flex-wrap gap-3 w-md md:w-3xl">
      {randomPrompts.map((prompt, idx) => (
        <div className='bg-gradient-to-br rounded-full from-red-400 via-purple-500 to-blue-400 p-[1.2px] active:scale-95'>
        <div key={idx} onClick={(e)=>setPrompt(e.target.innerText)}
        className="px-4 py-2 rounded-full border-2 text-gray-500  hover:text-black border-gray-400 hover:border-blue-500 bg-gray-50 text-sm cursor-pointer transition">
          {prompt}
        </div>
        </div>))}
      </div>
       )}
      </div>

      {login && <FirstLogin open={setLogin}/> }
        
    
      <div className='w-full flex flex-col justify-center items-center pt-5 pb-10 md:p-5'>
      { image && 
      <div className='relative'>
      <img className='w-2xs md:w-xl h-[300px] md:h-[600px] rounded-xl' src={`data:image/jpeg;base64,${image}`} ></img>
      <button onClick={handleDownload} title='Download image' className='absolute top-4 right-4 bg-white/10 text-white py-2 px-3 rounded-md '><FaArrowDownLong size={20}/></button>
      </div>
      }
      </div>
    
    </div>
  )
}

export default TextToImage
