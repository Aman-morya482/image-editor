import React from 'react'
import { useState, useRef ,useEffect } from 'react'
import { animate, frame, motionValue } from "motion";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all';
import { TextPlugin } from "gsap/TextPlugin";
import ReactCompareImage from "react-compare-image";
import '../App.css';
import FAQ from "../components/FAQ"


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
  const gradientText = useRef(null);
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
        gsap.fromTo(gradientText.current, { y:"50%" , opacity:0 },
          {
            y:"0%",
            opacity:1,
            ease:"linear",
            scrollTrigger:{
              trigger:gradientText.current,
              start:"top 90%",
              end:"top 50%",
              scrub:true,
            }
          })
        gsap.fromTo(".rightBox1", { opacity:0 , scale:0.6 },
          {
            // x:"0%",
            ease:"power2.inOut",
            duration:1,
            opacity:1,
            scale:1,
            scrollTrigger:{
              trigger:".rightBox1",
              start:"top bottom",
              end:"botoom 50%",
            }
          })
        gsap.fromTo(".rightBox1", {opacity:1, scale:1},
          { opacity:0,
            ease:"power2.inOut",
            duration:1,
            scale:0.8,
            scrollTrigger:{
              trigger:".rightBox1",
              start:"top top",
              end:"bottom top",
              scrub:true,
            }
          })
        gsap.fromTo(".rightBox2", {opacity:0, scale:0.6 },
          {
            opacity:1,
            ease:"power2.inOut",
            duration:1,
            scale:1,
            scrollTrigger:{
              trigger:".rightBox2",
              start:"top bottom",
              end:"botoom 50%",
            }
          })
        gsap.fromTo(".rightBox2", {opacity:1,  scale:1},
          { opacity:0,
            ease:"power2.inOut",
            duration:1,
            scale:0.8,
            scrollTrigger:{
              trigger:".rightBox2",
              start:"top top",
              end:"bottom top",
              scrub:true,
            }
          })
        gsap.fromTo(".rightBox3", { scale:0.6, opacity:0 },
          {
            scale:1,
            opacity:1,
            ease:"power2.inOut",
            duration:1,
            scrollTrigger:{
              trigger:".rightBox3",
              start:"top bottom",
              end:"botoom 50%",
            }
          })
        gsap.fromTo(".rightBox3", {opacity:1, scale:1},
          { opacity:0,
            ease:"power2.inOut",
            duration:1,
            scale:0.8,
            scrollTrigger:{
              trigger:".rightBox3",
              start:"top top",
              end:"bottom top",
              scrub:true,
            }
          })
        gsap.fromTo(".rightBox4", { scale:0.6, opacity:0 },
          {
            scale:1,
            opacity:1,
            ease:"power2.inOut",
            duration:1,
            scrollTrigger:{
              trigger:".rightBox4",
              start:"top bottom",
              end:"botoom 50%",
            }
          })
        gsap.fromTo(".rightBox4", {opacity:1, scale:1},
          { opacity:0,
            ease:"power2.inOut",
            duration:1,
            scale:0.8,
            scrollTrigger:{
              trigger:".rightBox4",
              start:"top top",
              end:"bottom top",
              scrub:true,
            }
          })
        gsap.fromTo(".leftBox1", { scale:0.6, opacity:0 },
          {
            scale:1,
            ease:"power2.inOut",
            duration:1,
            opacity:1,
            scrollTrigger:{
              trigger:".leftBox1",
              start:"top bottom",
              end:"botoom 50%",
            }
          })
        gsap.fromTo(".leftBox1", {opacity:1, scale:1},
          { opacity:0,
            ease:"power2.inOut",
            duration:1,
            scale:0.8,
            scrollTrigger:{
              trigger:".leftBox1",
              start:"top top",
              end:"bottom top",
              scrub:true,
            }
          })
        gsap.fromTo(".leftBox2", { scale:0.6, opacity:0 },
          {
            scale:1,
            opacity:1,
            ease:"power2.inOut",
            duration:1,
            scrollTrigger:{
              trigger:".leftBox2",
              start:"top bottom",
              end:"botoom 50%",
            }
          })
        gsap.fromTo(".leftBox2", {opacity:1, scale:1},
          { opacity:0,
            ease:"power2.inOut",
            duration:1,
            scale:0.8,
            scrollTrigger:{
              trigger:".leftBox2",
              start:"top top",
              end:"bottom top",
              scrub:true,
            }
          })
        gsap.fromTo(".leftBox3", { scale:0.6, opacity:0 },
          {
            scale:1,
            opacity:1,
            ease:"power2.inOut",
            duration:1,
            scrollTrigger:{
              trigger:".leftBox3",
              start:"top bottom",
              end:"botoom 50%",
            }
          })
        gsap.fromTo(".leftBox3", {opacity:1, scale:1},
          { opacity:0,
            ease:"power2.inOut",
            duration:1,
            scale:0.8,
            scrollTrigger:{
              trigger:".leftBox3",
              start:"top top",
              end:"bottom top",
              scrub:true,
            }
          })
        gsap.fromTo(".leftBox4", { scale:0.6 , opacity:0 },
          {
            scale:1,
            opacity:1,
            ease:"power2.inOut",
            duration:1,
            scrollTrigger:{
              trigger:".leftBox4",
              start:"top bottom",
              end:"botoom 50%",
            }
          })
        gsap.fromTo(".leftBox4", {opacity:1 , scale:1},
          { opacity:0,
            scale:0.8,
            ease:"power2.inOut",
            duration:1,
            scrollTrigger:{
              trigger:".leftBox4",
              start:"top top",
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


      <div className='relative overflow-hidden h-max w-full py-20 flex flex-col gap-10 md:gap-20 justify-between items-center text-black px-5 md:px-20'
      style={{background: "linear-gradient(173deg, rgba(256,256,253,0.7) 7%, rgba(255,255,76,0.7) 30%, rgba(255,66,105,0.7) 56%, rgba(255,54,241,0.7) 71%, rgba(255,256,256,1) 100%"}}>
        
        <div ref={gradientText} className='text-5xl font-protest opacity-100'    
        style={{
          background: "linear-gradient(to right, blue,red )",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>What we serve </div>

        <div className='flex w-full rightBox1 '>
        <div className='w-[300px] md:w-[700px] lg:w-[900px] md:h-[400px] group md:flex justify-between items-center rounded-[20px] border-[12px] md:border-[20px] py-8 px-4 md:px-10 border-transparent backdrop-blur-3xl' 
        style={{background: "linear-gradient(132deg, rgba(52,152,219,1) 6%, rgba(233,30,99,1) 65%) "}}
        >
        <div className='w-full md:w-[60%] flex flex-col gap-4 md:gap-8'>
          <div className='text-white flex flex-col text-xl md:text-4xl font-ubuntu font-semibold md:font-bold'>
          <p>Edit & Enhance</p>
          <p>Images with Ease!</p>
          </div>
          <h1 className='tracking-wider text-gray-100 text-sm hyphens-auto'>Transform your photos with editing tools. Crop, rotate, apply stunning filters, adjust lighting, and add text effortlessly. Perfect your visuals in just a few clicks!</h1>
          <button className='bg-pink-500 text-white py-1 md:py-2 w-[80px] md:w-[120px] rounded hover:ring-3 ring-pink-400 hover:cursor-pointer'><NavLink to='edit-image'>Try Now</NavLink></button>
        </div>
        <div className='w-[40%] hidden md:block'><MdOutlineDraw className='text-white text-[200px] transition-all duration-200 ease-out ml-20 group-hover:scale-130'/></div>
        </div>
        <div></div>
          </div>

        <div className='flex flex-row-reverse w-full leftBox1'>
        <div className='w-[300px] md:w-[700px] lg:w-[900px] md:h-[400px] group md:flex justify-between items-center rounded-[20px] border-[12px] md:border-[20px] py-8 px-4 md:px-10 border-transparent backdrop-blur-3xl' 
        style={{background: "linear-gradient(132deg, rgba(255,126,0,1) 20%, rgba(255,235,59,1) 82%)"}}
        >
        <div className='w-full md:w-[60%] flex flex-col gap-4 md:gap-8'>
          <div className='text-white flex flex-col text-xl md:text-4xl font-ubuntu font-semibold md:font-bold'>
          <p>Background Removal</p>
          <p>One Click Magic!</p>
          </div>
          <h1 className='tracking-wider text-gray-100 text-sm '>Instantly remove backgrounds from any image. Whether for product photos, profile pictures, or creative designs, get a clean, transparent background in seconds!</h1>
          <button className='bg-yellow-300 py-1 md:py-2 w-[80px] md:w-[120px] rounded hover:ring-3 ring-yellow-200 hover:cursor-pointer'><NavLink to='bg-remover'>Try Now</NavLink></button>
        </div>
        <div className='w-[40%] hidden md:block'><TbBackground className='text-white text-[200px] transition-all duration-200 ease-out ml-20 group-hover:scale-130'/></div>
        </div>
        <div></div>
        </div> 
 
         <div className='flex w-full rightBox2'>
        <div className='w-[300px] md:w-[700px] lg:w-[900px] md:h-[400px] group md:flex justify-between items-center rounded-[20px] border-[12px] md:border-[20px] py-8 px-4 md:px-10 border-transparent backdrop-blur-3xl' 
        style={{background: "linear-gradient(132deg, rgba(30,50,156,1) 14%, rgba(33,150,243,1) 62%)"}}
        >
        <div className='w-full md:w-[60%] flex flex-col gap-4 md:gap-8'>
          <div className='text-white flex flex-col text-xl md:text-4xl font-ubuntu font-semibold md:font-bold'>
          <p>Image to PDF</p>
          <p>Convert in Seconds!</p>
          </div>
          <h1 className='tracking-wider text-gray-100 text-sm hyphens-auto'>Create high-quality PDFs from images with just a click. Whether for documents, portfolios, or presentations, turn multiple images into a single, organized PDF effortlessly!</h1>
          <button className='bg-blue-600 text-white py-1 md:py-2 w-[80px] md:w-[120px] rounded ring-blue-400 hover:ring-3'><NavLink to='pdf-maker'>Try Now</NavLink></button>
        </div>
        <div className='w-[40%] hidden md:block'><PiFilePdfLight className='text-white text-[200px] transition-all duration-200 ease-out ml-20 group-hover:scale-130'/></div>
        </div>
        <div></div>
        </div>
     
       <div className='flex flex-row-reverse w-full leftBox2'>
        <div className='w-[300px] md:w-[700px] lg:w-[900px] md:h-[400px] group md:flex justify-between items-center rounded-[20px] border-[12px] md:border-[20px] py-8 px-4 md:px-10 border-transparent backdrop-blur-3xl' 
        style={{background: "linear-gradient(132deg, rgba(142,68,173,1) 14%, rgba(255,107,129,1) 62%)"}}
        >
        <div className='w-full md:w-[60%] flex flex-col gap-4 md:gap-8'>
          <div className='text-white flex flex-col text-xl md:text-4xl font-ubuntu font-semibold md:font-bold'>
          <p>AI-Image Generation</p>
          <p>Create Stunning Visuals!</p>
          </div>
          <h1 className='tracking-wider text-gray-100 text-sm'>Turn your ideas into breathtaking images with AI. <p></p> Simply enter a prompt, and let the AI generate unique, <p></p> high-quality visuals for art, designs, or social media!</h1>
          <button className='bg-pink-600 text-white py-1 md:py-2 w-[80px] md:w-[120px] rounded hover:ring-3 ring-pink-400 hover:cursor-pointer'><NavLink to='text-to-image'>Try Now</NavLink></button>       
        </div>
        <div className='w-[40%] hidden md:block'><RiAiGenerate2 className='text-white text-[200px] transition-all duration-200 ease-out ml-20 group-hover:scale-130'/></div>
        </div>
        <div></div>
        </div>

        <div className='flex w-full rightBox3'>
        <div className='w-[300px] md:w-[700px] lg:w-[900px] md:h-[400px] group md:flex justify-between items-center rounded-[20px] border-[12px] md:border-[20px] py-8 px-4 md:px-10 border-transparent backdrop-blur-3xl' 
        style={{background: "linear-gradient(132deg, rgba(52,152,219,1) 16%, rgba(20,16,134,1) 65%)"}}
        >
        <div className='w-full md:w-[60%] flex flex-col gap-4 md:gap-8'>
          <div className='text-white flex flex-col text-xl md:text-4xl font-ubuntu font-semibold md:font-bold'>
          <p>Image Format Conversion</p>
          <p>Fast & Reliable!</p>
          </div>
          <h1 className='tracking-wider text-gray-100 text-sm'>Convert images to the format you need without compromising quality. Whether you're switching between JPG, PNG, JPEG, get quick and efficient results every time!</h1>
          <button className='bg-blue-400 text-white py-1 md:py-2 w-[80px] md:w-[120px] rounded hover:ring-3 ring-blue-300 hover:cursor-pointer'><NavLink to='image-convertor'>Try Now</NavLink></button>
        </div>
        <div className='w-[40%] hidden md:block'><AiOutlineFileSync className='text-white text-[200px] transition-all duration-200 ease-out ml-20 group-hover:scale-130'/></div>
        </div>
        <div></div>
        </div>

        <div className='flex flex-row-reverse w-full leftBox3'>
        <div className='w-[300px] md:w-[700px] lg:w-[900px] md:h-[400px] group md:flex justify-between items-center rounded-[20px] border-[12px] md:border-[20px] py-8 px-4 md:px-10 border-transparent backdrop-blur-3xl' 
        style={{background: "linear-gradient(132deg, rgba(52,152,219,1) 16%, rgba(212,30,171,1) 65%)"}}
        >
        <div className='w-full md:w-[60%] flex flex-col gap-4 md:gap-8'>
          <div className='text-white flex flex-col text-xl md:text-4xl font-ubuntu font-semibold md:font-bold'>
          <p>Image Compression</p>
          <p>Reduce Size, Keep Quality</p>
          </div>
          <h1 className='tracking-wider text-gray-100 text-sm hyphens-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit omnis aliquam repellat vero ipsum ducimus iste enim assumenda unde reiciendis.</h1>
          <button className='bg-pink-500 text-white py-1 md:py-2 w-[80px] md:w-[120px] rounded hover:ring-3 ring-pink-300 hover:cursor-pointer'><NavLink to='image-compressor'>Try Now</NavLink></button>
        </div>
        <div className='w-[40%] hidden md:block'><FaCompress className='text-white text-[200px] transition-all duration-200 ease-out ml-20 group-hover:scale-80'/></div>
        </div>
        <div></div>
        </div>

        <div className='flex w-full rightBox4'>
        <div className='w-[300px] md:w-[700px] lg:w-[900px] md:h-[400px] group md:flex justify-between items-center rounded-[20px] border-[12px] md:border-[20px] py-8 px-4 md:px-10 border-transparent backdrop-blur-3xl' 
        style={{background: "linear-gradient(132deg, rgba(52,52,119,1) 16%, rgba(233,30,99,1) 65%)"}}
        >
        <div className='w-full md:w-[60%] flex flex-col gap-4 md:gap-8'>
          <div className='text-white flex flex-col text-xl md:text-4xl font-ubuntu font-semibold md:font-bold'>
          <p>AI Image Analyzer</p>
          <p>Get Instant Description!</p>
          </div>
          <h1 className='tracking-wider text-gray-100 text-sm hyphens-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit omnis aliquam repellat vero ipsum ducimus iste enim assumenda unde reiciendis.</h1>
          <button className='bg-red-500 text-white py-1 md:py-2 w-[80px] md:w-[120px] rounded hover:ring-3 ring-red-300 hover:cursor-pointer'><NavLink to='image-detector'>Try Now</NavLink></button>
        </div>
        <div className='w-[40%] hidden md:block'><MdOutlineImageSearch className='text-white text-[200px] transition-all duration-200 ease-out ml-20 group-hover:scale-130'/></div>
        </div>
        <div>
        </div>
        </div>

        <div className='flex w-full flex-row-reverse leftBox4'>
        <div className='w-[300px] md:w-[700px] lg:w-[900px] md:h-[400px] group md:flex justify-between items-center rounded-[20px] border-[12px] md:border-[20px] py-8 px-4 md:px-10 border-transparent backdrop-blur-3xl' 
        style={{background: "linear-gradient(132deg, rgba(32,112,9,1) 30%, rgba(63,220,69,1) 80%)"}}
        >
        <div className='w-full md:w-[60%] flex flex-col gap-4 md:gap-8'>
          <div className='text-white flex flex-col text-xl md:text-4xl font-ubuntu font-semibold md:font-bold'>
          <p>Image Enhancer</p>
          <p>Boost Quality Instantly! </p>
          </div>
          <h1 className='tracking-wider text-gray-100 text-sm hyphens-auto'>Improve resolution, sharpness, and colors to achieve high-quality visuals. Whether it's an old photo, a low-resolution image, or a blurry picture, restore details effortlessly!</h1>
          <button className='bg-green-600 text-white py-1 md:py-2 w-[80px] md:w-[120px] rounded hover:ring-3 ring-green-400 hover:cursor-pointer'><NavLink to='image-enhancer'>Try Now</NavLink></button>
        </div>
        <div className='w-[40%] hidden md:block'><RiImageAiLine className='text-white text-[200px] transition-all duration-200 ease-out ml-20 group-hover:scale-130'/></div>
        </div>
        <div>
        </div>
        </div>
          

      </div>

      <FAQ/>
    </div>

  )
}

export default Home
