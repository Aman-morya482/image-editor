import React from 'react'
import { useState, useRef ,useEffect } from 'react'
import { animate, frame, motionValue } from "motion";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all';
import { TextPlugin } from "gsap/TextPlugin";
import ReactCompareImage from "react-compare-image";
import '../App.css';


import { RiImageEditLine } from "react-icons/ri";
import { IoImagesOutline } from "react-icons/io5";
import { RiImageAiLine } from "react-icons/ri";
import { PiFilePdfLight } from "react-icons/pi";
import { RiAiGenerate2 } from "react-icons/ri";
import { RiExchangeBoxLine } from "react-icons/ri";
import { AiOutlineFileSync } from "react-icons/ai";
import { VscFileMedia } from "react-icons/vsc";
import { TbBackground } from "react-icons/tb";
import { MdOutlineImageSearch } from "react-icons/md";
import { MdOutlineDraw } from "react-icons/md";
import { FaCompressArrowsAlt } from "react-icons/fa";
import { FaCompress } from "react-icons/fa";





const Home = () => {

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(TextPlugin);

  const blurDiv1 = useRef(null);
  const blurDiv2 = useRef(null);
  const marText1 = useRef (null);
  const marText2 = useRef (null);
  const ballRef = useRef(null);
  const pointerX = motionValue(0);
  const pointerY = motionValue(0);


  const words = ["Editing","Compressor","Enhancer","BG Remover","Generation","Conversion"];
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const typingSpeed = isDeleting ? 50 : 100; // Faster deleting

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setText((prev) => prev.slice(0, -1)); // Delete one letter
      } else {
        setText((prev) => currentWord.slice(0, prev.length + 1)); // Type one letter
      }

      // When full word is typed, pause before deleting
      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 1000);
      }

      // When word is fully deleted, move to next word
      if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

 
    useEffect(() => {
    gsap.to(blurDiv1.current, 
      {
      x: -150,
      y: 30,
      scale: 0.5,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      },
    );
    gsap.to(blurDiv2.current, 
      {
      x: -150,
      y: 30,
      scale: 0.5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      },
    );
    gsap.fromTo(marText2.current, { x: "30%" },
    {
      x:"-30%",
      duration:15,
      ease:"linear",
      scrollTrigger:{
        trigger:marText2.current,
        start:"top bottom",
        end:"bottom top",
        scrub:true,
      }
    })
    gsap.fromTo(marText1.current, {x:"-20%"},
    {
      x:"30%",
      duration:15,
      ease:"linear",
      scrollTrigger:{
        trigger:marText1.current,
        start:"top bottom",
        end:"bottom top",
        scrub:true,
      }
    })
    const cursorBlink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 400);


        
    const ball = ballRef.current;
    if (!ball) return;
    const { top, left, width, height } = ball.getBoundingClientRect();
    const initialX = left + width / 2;
    const initialY = top + height / 2;

    function springToPointer() {
      animate(
        ball,
        {
          x: pointerX.get() - initialX,
          y: pointerY.get() - initialY,
        },
        { type: "spring", stiffness: 100, damping: 10 }
      );
    }

    function scheduleSpringToPointer() {
      frame.postRender(springToPointer);
    }

    pointerX.on("change", scheduleSpringToPointer);
    pointerY.on("change", scheduleSpringToPointer);

    const handleMouseMove = (e) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
    };


    window.addEventListener("pointermove", handleMouseMove)


    return () => {
      clearInterval(cursorBlink)
      window.removeEventListener("pointermove", handleMouseMove)
    };
  }, []);


  return (
    <div>
      <div className='h-[92vh] w-full relative overflow-hidden flex flex-col md:flex-row justify-center items-center gap-10 md:px-15 py-20'>
      <div ref={ballRef} className='z-[-1] w-[50px] h-[50px] bg-blue-600 hidden md:block absolute rounded-[50%]'></div>
      <div ref={blurDiv1} className="z-[-1] absolute -right-[200px] w-[500px] h-[500px] hidden md:block  bg-blue-600 rounded-full opacity-90 blur-[80px] shadow-[0_0_80px_200px_rgb(96, 165, 250)]"></div>
      <div ref={blurDiv2} className="z-[-1] absolute -left-[150px] w-[400px] h-[400px] hidden md:block bg-blue-600 rounded-full opacity-90 blur-[80px] shadow-[0_0_80px_200px_rgb(96, 165, 250)]"></div>
      <div className='w-full h-full text-5xl md:text-8xl text-black flex flex-col md:justify-center text-center md:text-left'>
        <h1 className='font-bold'>One Place</h1>
        <h1 className='font-bold'>Solution for</h1>
        <h2 className='font-bold'>Image <span className={`text-blue-600 border-blue-500 ${showCursor ? "border-r-2" : "border-0"}`}>{text}</span></h2>
      </div>
<div className='relative md:pr-10'>
<div className="slider-border w-[280px] md:w-[300px] h-[280px] md:h-[350px] p-4 rotate-[-8deg] md:overflow-hidden ">
  <ReactCompareImage
    leftImage="/img/slider-image1.jpg"
    rightImage="/img/slider-image2.jpg"
    containerStyle={{ width: "100%", height: "70%" }} 
    leftImageCss={{
      width: "100%",
      height: "70%",
      objectFit: "cover", // Make sure it fills the container
      borderRadius: "15px",
    }}
    rightImageCss={{
      width: "100%",
      height: "70%",
      objectFit: "cover",
      borderRadius: "15px",
    }}
  />
</div>
<div className="slider-border w-[280px] md:w-[300px] h-[280px] md:h-[350px] absolute z-[-1] bottom-5 p-4 rotate-[2deg] overflow-hidden">
  <ReactCompareImage
    righttImage="/img/slider-image1.jpg"
    leftImage="/img/slider-image2.jpg"
    containerStyle={{ width: "100%", height: "70%" }} 
    leftImageCss={{
      width: "100%",
      height: "70%",
      objectFit: "cover", // Make sure it fills the container
      borderRadius: "15px",
    }}
    rightImageCss={{
      width: "100%",
      height: "70%",
      objectFit: "cover",
      borderRadius: "15px",
    }}
  />
</div>
</div>
      </div>

      
      <div className='relative overflow-hidden h-[45vh] flex flex-col justify-center items-center font-tektur'>
        <div className='w-max bg-blue-700 text-white whitespace-nowrap text-2xl md:text-5xl font-bold py-4 md:py-8 '>
          <h1 ref={marText2} className='px-8 flex space-x-10'>
           <p>Image Editor</p><p>*</p>
           <p>PDF Maker </p><p>*</p>          
           <p>BG Remover </p><p>*</p>
           <p>Image Enhancer </p><p>*</p>
           <p>Image Compressor</p><p>*</p>          
       
           </h1>
        </div>
        <div className='w-max border-b-3 border-blue-700 bg-white whitespace-nowrap text-blue-700 text-2xl md:text-5xl font-bold py-4 md:py-8 '>
          <h1 ref={marText1} className='px-8 flex space-x-10'>
           <p>Image Compressor</p><p>*</p>       
           <p>Image Enhancer</p><p>*</p>
           <p>Image BG Remover</p><p>*</p>
           <p>Image Convertor</p><p>*</p>
           <p>Image Analyser</p><p>*</p>
           </h1>
        </div>
      </div>


      <div className='relative w-full py-20 flex flex-col gap-10 justify-between items-center bg-black text-white'>
        <div className='w-[300px] md:w-[700px] lg:w-[900px] md:h-[400px] md:flex justify-between items-center rounded-[20px] border-[2px] py-8 px-4 md:px-10 border-slate-300 backdrop-blur-3xl sticky top-16' 
        style={{background: "linear-gradient(170deg, rgba(0,0,0,1) 59%, rgba(209,209,209,0.2473061749113708) 98%)"}}
        >
        <div className='w-full md:w-[60%] flex flex-col gap-4 md:gap-8'>
          <div className='flex flex-col text-xl md:text-4xl font-ubuntu font-semibold md:font-bold'>
          <p>Instantly Create Stunning</p>
          <p>Visuals - <span className='text-blue-600'>AI-Generate</span></p>
          </div>
          <h1 className='tracking-wider text-gray-100 text-sm hyphens-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit omnis aliquam repellat vero ipsum ducimus iste enim assumenda unde reiciendis.</h1>
          <button className='bg-blue-600 py-1 md:py-2 w-[80px] md:w-[120px] rounded'>Try Now</button>
        </div>
        <div className='w-[40%] hidden md:block'><MdOutlineDraw className='text-white\ text-[200px] ml-20'/></div>
        </div>

        <div className='w-[300px] md:w-[700px] lg:w-[900px] md:h-[400px] md:flex justify-between items-center rounded-[20px] border-[2px] py-8 px-4 md:px-10 border-slate-300 backdrop-blur-3xl sticky top-16' 
        style={{background: "linear-gradient(210deg, rgba(0,0,0,1) 59%, rgba(209,209,209,0.2473061749113708) 98%)"}}
        >
        <div className='w-full md:w-[60%] flex flex-col gap-4 md:gap-8'>
          <div className='flex flex-col text-xl md:text-4xl font-ubuntu font-semibold md:font-bold'>
          <p>Perfect Your Photo with</p>
          <p>Ease - <span className='text-blue-600'>Photo Retouch</span></p>
          </div>
          <h1 className='tracking-wider text-gray-100 text-sm hyphens-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit omnis aliquam repellat vero ipsum ducimus iste enim assumenda unde reiciendis.</h1>
          <button className='bg-blue-600 py-1 md:py-2 w-[80px] md:w-[120px] rounded'>Try Now</button>
        </div>
        <div className='w-[40%] hidden md:block'><RiImageAiLine className='text-white text-[200px] ml-20'/></div>
        </div>

        <div className='w-[300px] md:w-[700px] lg:w-[900px] md:h-[400px] md:flex justify-between items-center rounded-[20px] border-[2px] py-8 px-4 md:px-10 border-slate-300 backdrop-blur-3xl sticky top-16' 
        style={{background: "linear-gradient(130deg, rgba(0,0,0,1) 59%, rgba(209,209,209,0.2473061749113708) 98%)"}}
        >
        <div className='w-full md:w-[60%] flex flex-col gap-4 md:gap-8'>
          <div className='flex flex-col text-xl md:text-4xl font-ubuntu font-semibold md:font-bold'>
          <p>Clean Cuts, Seamless</p>
          <p>Results - <span className='text-blue-600'>BG Remover</span></p>
          </div>
          <h1 className='tracking-wider text-gray-100 text-sm hyphens-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit omnis aliquam repellat vero ipsum ducimus iste enim assumenda unde reiciendis.</h1>
          <button className='bg-blue-600 py-1 md:py-2 w-[80px] md:w-[120px] rounded'>Try Now</button>
        </div>
        <div className='w-[40%] hidden md:block'><PiFilePdfLight className='text-white text-[200px] ml-20'/></div>

        </div>
        <div className='w-[300px] md:w-[700px] lg:w-[900px] md:h-[400px] md:flex justify-between items-center rounded-[20px] border-[2px] py-8 px-4 md:px-10 border-slate-300 backdrop-blur-3xl sticky top-16' 
        style={{background: "linear-gradient(210deg, rgba(0,0,0,1) 59%, rgba(209,209,209,0.2473061749113708) 98%)"}}
        >
        <div className='w-full md:w-[60%] flex flex-col gap-4 md:gap-8'>
          <div className='flex flex-col text-xl md:text-4xl font-ubuntu font-semibold md:font-bold'>
          <p>Instantly Create Stunning</p>
          <p>Visuals - <span className='text-blue-600'>AI-Generate</span></p>
          </div>
          <h1 className='tracking-wider text-gray-100 text-sm hyphens-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit omnis aliquam repellat vero ipsum ducimus iste enim assumenda unde reiciendis.</h1>
          <button className='bg-blue-600 py-1 md:py-2 w-[80px] md:w-[120px] rounded'>Try Now</button>
        </div>
        <div className='w-[40%] hidden md:block'><RiAiGenerate2 className='text-white text-[200px] ml-20'/></div>
        </div>
     
        <div className='w-[300px] md:w-[700px] lg:w-[900px] md:h-[400px] md:flex justify-between items-center rounded-[20px] border-[2px] py-8 px-4 md:px-10 border-slate-300 backdrop-blur-3xl sticky top-16' 
        style={{background: "linear-gradient(210deg, rgba(0,0,0,1) 59%, rgba(209,209,209,0.2473061749113708) 98%)"}}
        >
        <div className='w-full md:w-[60%] flex flex-col gap-4 md:gap-8'>
          <div className='flex flex-col text-xl md:text-4xl font-ubuntu font-semibold md:font-bold'>
          <p>Instantly Create Stunning</p>
          <p>Visuals - <span className='text-blue-600'>AI-Generate</span></p>
          </div>
          <h1 className='tracking-wider text-gray-100 text-sm hyphens-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit omnis aliquam repellat vero ipsum ducimus iste enim assumenda unde reiciendis.</h1>
          <button className='bg-blue-600 py-1 md:py-2 w-[80px] md:w-[120px] rounded'>Try Now</button>
        </div>
        <div className='w-[40%] hidden md:block'><TbBackground className='text-white text-[200px] ml-20'/></div>
        </div>

        <div className='w-[300px] md:w-[700px] lg:w-[900px] md:h-[400px] md:flex justify-between items-center rounded-[20px] border-[2px] py-8 px-4 md:px-10 border-slate-300 backdrop-blur-3xl sticky top-16' 
        style={{background: "linear-gradient(210deg, rgba(0,0,0,1) 59%, rgba(209,209,209,0.2473061749113708) 98%)"}}
        >
        <div className='w-full md:w-[60%] flex flex-col gap-4 md:gap-8'>
          <div className='flex flex-col text-xl md:text-4xl font-ubuntu font-semibold md:font-bold'>
          <p>Instantly Create Stunning</p>
          <p>Visuals - <span className='text-blue-600'>AI-Generate</span></p>
          </div>
          <h1 className='tracking-wider text-gray-100 text-sm hyphens-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit omnis aliquam repellat vero ipsum ducimus iste enim assumenda unde reiciendis.</h1>
          <button className='bg-blue-600 py-1 md:py-2 w-[80px] md:w-[120px] rounded'>Try Now</button>
        </div>
        <div className='w-[40%] hidden md:block'><AiOutlineFileSync className='text-white text-[200px] ml-20'/></div>
        </div>

        <div className='w-[300px] md:w-[700px] lg:w-[900px] md:h-[400px] md:flex justify-between items-center rounded-[20px] border-[2px] py-8 px-4 md:px-10 border-slate-300 backdrop-blur-3xl sticky top-16' 
        style={{background: "linear-gradient(210deg, rgba(0,0,0,1) 59%, rgba(209,209,209,0.2473061749113708) 98%)"}}
        >
        <div className='w-full md:w-[60%] flex flex-col gap-4 md:gap-8'>
          <div className='flex flex-col text-xl md:text-4xl font-ubuntu font-semibold md:font-bold'>
          <p>Instantly Create Stunning</p>
          <p>Visuals - <span className='text-blue-600'>AI-Generate</span></p>
          </div>
          <h1 className='tracking-wider text-gray-100 text-sm hyphens-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit omnis aliquam repellat vero ipsum ducimus iste enim assumenda unde reiciendis.</h1>
          <button className='bg-blue-600 py-1 md:py-2 w-[80px] md:w-[120px] rounded'>Try Now</button>
        </div>
        <div className='w-[40%] hidden md:block'><FaCompress className='text-white text-[200px] ml-20'/></div>
        </div>

        <div className='w-[300px] md:w-[700px] lg:w-[900px] md:h-[400px] md:flex justify-between items-center rounded-[20px] border-[2px] py-8 px-4 md:px-10 border-slate-300 backdrop-blur-3xl sticky top-16' 
        style={{background: "linear-gradient(210deg, rgba(0,0,0,1) 59%, rgba(209,209,209,0.2473061749113708) 98%)"}}
        >
        <div className='w-full md:w-[60%] flex flex-col gap-4 md:gap-8'>
          <div className='flex flex-col text-xl md:text-4xl font-ubuntu font-semibold md:font-bold'>
          <p>Instantly Create Stunning</p>
          <p>Visuals - <span className='text-blue-600'>AI-Generate</span></p>
          </div>
          <h1 className='tracking-wider text-gray-100 text-sm hyphens-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit omnis aliquam repellat vero ipsum ducimus iste enim assumenda unde reiciendis.</h1>
          <button className='bg-blue-600 py-1 md:py-2 w-[80px] md:w-[120px] rounded'>Try Now</button>
        </div>
        <div className='w-[40%] hidden md:block'><MdOutlineImageSearch className='text-white text-[200px] ml-20'/></div>
        </div>

      </div>

    </div>
  )
}

export default Home
