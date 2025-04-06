import React, { useEffect, useState } from 'react'

import { PiMagicWandDuotone } from "react-icons/pi";


const TextToImage = () => {

  const [prompt,setPrompt] = useState("");
  const [loading,setLoading] = useState(false);
  const [image,setImage] = useState("");

        const sendToBackend = async () => {

        if (prompt.length <= 0) return alert("Write some prompt");

        try{
          setImage("");
          setLoading(true);
          
          const response = await fetch('http://localhost:8080/image-generator', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Prompt: prompt}),
          });
          
          if (!response.ok) throw new Error('Generation failed');
          const data = await response.json();
          setCompress(data.image);
          setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setLoading(false);
        alert("failed");
      }
    };
  
  useEffect(()=>{
    console.log(prompt)
  },[prompt])

  return (
    <div>
      <div className='flex flex-col items-center justify-center gap-10 h-screen px-10'>
        <p className='text-6xl font-bold mb-5 text-center'  style={{
          background: "linear-gradient(to right,blue,purple,red )",
          WebkitBackgroundClip: "text",
          lineHeight:"1.2",
          WebkitTextFillColor: "transparent",
        }}>AI Image Generator</p>
      <div className='flex flex-wrap justify-center items-center gap-2'>
        <input type="text" value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder='What do you want to see?' className='border border-gray-400 rounded-md w-sm sm:w-lg md:w-xl p-3 focus:outline-blue-300 ' />
        <button onClick={sendToBackend} className='p-3 bg-gradient-to-r from-blue-600 via-purple-800 to-red-500 rounded-md text-white ring-blue-300 active:scale-95 hover:ring-2 hover:cursor-pointer flex gap-2 items-center'><PiMagicWandDuotone size={24}/>{loading ? "Processing..." : "Generate Image"}</button>
      </div>
      </div>
    </div>
  )
}

export default TextToImage
