import { useState, useRef, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from 'gsap/all';
import '../App.css';
import gsap from "gsap";

import { animatePixelo } from '../utils/gsap';
import QuickLinks from '../components/QuickLinks';
import FAQ from "../components/FAQ";
import Slider from "../components/Slider";

import { RiImageAiLine } from "react-icons/ri";
import { PiCursorClick } from "react-icons/pi";
import { LuUpload } from "react-icons/lu";
import { FiDownload } from "react-icons/fi";


const Home = () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(TextPlugin);

  const blurDiv1 = useRef(null);
  const blurDiv2 = useRef(null);
  const marText1 = useRef(null);
  const marText2 = useRef(null);
  const gradientText = useRef(null);
  const words = ["Editing", "Compressor", "Enhancer", "BG Remover", "Generation", "Conversion"];
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const typingSpeed = isDeleting ? 50 : 100;

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (isDeleting) { setText((prev) => prev.slice(0, -1)); }
      else { setText((prev) => currentWord.slice(0, prev.length + 1)); }

      if (!isDeleting && text === currentWord) { setTimeout(() => setIsDeleting(true), 1000); }
      if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  useEffect(() => {
    const cleanup = animatePixelo({ blurDiv1, blurDiv2, marText1, marText2, gradientText }, setShowCursor);
    return () => { cleanup(); };
  }, []);

  useEffect(() => {
    gsap.fromTo(".textRef", { scale: 0.95, x: "-5%", opacity: 0 }, {
      x: "0%",
      scale: 1,
      opacity: 1,
      duration: 1.4,
      ease: "power1.inOut"
    });
    gsap.fromTo(".sliderRef", { scale: 2, x: "40%", opacity: 0 }, {
      x: "0%",
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power1.inOut"
    });
  }, [])

  return (
    <div>
      <div className='grid grid-cols-1 place-items-center'>
        <div className='h-[92vh] w-full max-w-[1800px] relative overflow-hidden flex flex-col md:flex-row justify-center items-center gap-20 md:px-15 py-20 md:py-30 lg:py-40'>
          <div ref={blurDiv1} className="z-[-1] absolute -right-100 -top-50 md:top-10 md:-right-[200px] w-[500px] h-[500px] block  bg-blue-600 rounded-full opacity-90 blur-[80px] shadow-[0_0_80px_200px_rgb(96, 165, 250)]"></div>
          <div ref={blurDiv2} className="z-[-1] absolute -bottom-40 -left-20 md:bottom-10 md:-left-[150px] w-[400px] h-[400px] block bg-blue-600 rounded-full opacity-90 blur-[80px] shadow-[0_0_80px_200px_rgb(96, 165, 250)]"></div>
          <div className='textRef w-full h-full text-4xl md:text-6xl xl:text-8xl text-black flex flex-col md:justify-center text-center md:text-left'>
            <h1 className='font-bold'>One Place</h1>
            <h1 className='font-bold'>Solution for</h1>
            <h2 className='font-bold'>Image <span className={`text-blue-600 border-blue-500 ${showCursor ? "border-r-2" : "border-0"}`}>{text}</span></h2>
          </div>
          <div className='sliderRef relative md:pr-14'>
            <Slider />
          </div>
        </div>

        <div className='w-full text-center max-w-[1800px] text-lg text-white bg-gradient-to-br from-blue-500 to-purple-800 py-10 px-2 md:px-20 md:py-16'>
          <QuickLinks />
        </div>

        <div className='relative overflow-hidden h-max w-full max-w-[1800px] py-20 flex flex-col gap-10 md:gap-30 justify-between items-center text-black px-5 md:px-20'
          style={{ background: "linear-gradient(170deg, rgba(26,156,253,0.4) 50%, rgba(255,255,76,0.8) 50%" }}>
          <div ref={gradientText} className='text-4xl md:text-5xl text-center font-bold opacity-100'
            style={{ background: "linear-gradient(to right, blue,purple,red )", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", }}>
            Popular Features </div>
          <div className='flex flex-col-reverse justify-center items-center lg:flex-row gap-5 lg:gap-20 w-full'>
            <div className='md:w-2xl lg:w-3xl h-auto group md:flex justify-between items-center rounded-[20px] p-4 md:p-10'>
              <div className='w-full flex flex-col gap-2 md:gap-6'>
                <div className='flex flex-col text-2xl md:text-4xl lg:text-6xl font-semibold md:font-bold'>
                  <p>Edit & Enhance</p>
                  <p>Images with Ease!</p>
                </div>
                <h1 className='tracking-wider text-sm'>Transform your photos with editing tools. Crop, rotate, apply stunning filters, adjust lighting, and add text effortlessly. Perfect your visuals in just a few clicks!</h1>
                <button className='bg-blue-500 text-white py-1 md:py-2 w-[80px] md:w-[120px] rounded hover:ring-3 ring-blue-300 hover:cursor-pointer'><NavLink to='/image-editor'>Try Now</NavLink></button>
              </div>
            </div>
            <div><img src="/img/photo-collage.png" alt="" className='max-w-[240px] sm:max-w-sm leftBox1 ' /></div>
          </div>
          <div className='flex flex-col-reverse justify-center items-center lg:flex-row-reverse gap-5 lg:gap-20 w-full'>
            <div className='md:w-2xl lg:w-3xl h-auto group md:flex justify-between items-center rounded-[20px] p-4 md:p-10'>
              <div className='w-full flex flex-col gap-2 md:gap-6'>
                <div className='flex flex-col text-2xl md:text-4xl lg:text-6xl font-semibold md:font-bold'>
                  <p>Background Removal</p>
                  <p>One Click Magic!</p>
                </div>
                <h1 className='tracking-wider text-sm'>Instantly remove backgrounds from any image. Whether for product photos, profile pictures, or creative designs, get a clean, transparent background in seconds!</h1>
                <button className='bg-blue-500 text-white py-1 md:py-2 w-[80px] md:w-[120px] rounded hover:ring-3 ring-blue-300 hover:cursor-pointer'><NavLink to='/bg-remover'>Try Now</NavLink></button>
              </div>
            </div>
            <div><img src="/img/bg-show.jpg" alt="" className='max-w-[240px] sm:max-w-sm rightBox2 ' /></div>
          </div>
          <div className='flex flex-col-reverse justify-center items-center lg:flex-row gap-5 lg:gap-20 w-full'>
            <div className='md:w-2xl lg:w-3xl h-auto group md:flex justify-between items-center rounded-[20px] p-4 md:p-10'>
              <div className='w-full flex flex-col gap-2 md:gap-6'>
                <div className='flex flex-col text-2xl md:text-4xl lg:text-6xl font-semibold md:font-bold'>
                  <p>Image to PDF</p>
                  <p>Convert in Seconds!</p>
                </div>
                <h1 className='tracking-wider text-sm'>Create high-quality PDFs from images with just a click. Whether for documents, portfolios, or presentations, turn multiple images into a single, organized PDF effortlessly!</h1>
                <button className='bg-amber-500 text-white py-1 md:py-2 w-[80px] md:w-[120px] rounded hover:ring-3 font-semibold ring-amber-300 hover:cursor-pointer'><NavLink to='/pdf-maker'>Try Now</NavLink></button>
              </div>
            </div>
            <div><img src="/img/pdf-show.jpg" alt="" className='max-w-[240px] sm:max-w-sm leftBox2' /></div>
          </div>
          <div className='flex flex-col-reverse justify-center items-center lg:flex-row-reverse gap-5 lg:gap-20 w-full'>
            <div className='md:w-2xl lg:w-3xl h-auto group md:flex justify-between items-center rounded-[20px] p-4 md:p-10'>
              <div className='w-full flex flex-col gap-2 md:gap-6'>
                <div className='flex flex-col text-2xl md:text-4xl lg:text-6xl font-semibold md:font-bold'>
                  <p>AI-Image Generation</p>
                  <p>Create Stunning Visuals!</p>
                </div>
                <h1 className='tracking-wider text-sm'>Turn your ideas into breathtaking images with AI. Simply enter a prompt, and let the AI generate unique, high-quality visuals for art, designs, or social media!</h1>
                <button className='bg-amber-500 text-white py-1 md:py-2 w-[80px] md:w-[120px] rounded hover:ring-3 ring-amber-300 hover:cursor-pointer'><NavLink to='/text-to-image'>Try Now</NavLink></button>
              </div>
            </div>
            <div><img src="/img/ai-image-show.jpg" alt="" className='max-w-[240px] sm:max-w-sm rightBox1 ' /></div>
          </div>
        </div>

        <div className='relative w-full max-w-[1800px] text-white p-10 md:p-16 bg-purple-950'>
          <p className='text-center text-3xl md:text-4xl font-semibold mb-10 md:mb-15'>How Pixelo Works ?</p>
          <div className='flex flex-col md:flex-row flex-wrap justify-center items-center gap-4'>
            <div className='absolute w-xs md:w-2xl h-[200px] overflow-hidden rounded-[50%] bg-white/30 opacity-90 blur-[80px] shadow-[0_0_80px_200px_rgb(96, 165, 250)]'></div>
            <div className='quick2 max-w-[340px] z-[10] min-h-[180px] group flex flex-col gap-4 border border-white/70 bg-white/10 rounded-md p-4'>
              <PiCursorClick size={30} className='transition-all duration-100 translate-x-1 group-hover:translate-x-0' />
              <div className='text-lg font-semibold'>
                Select a Tool
                <p className='mt-2 text-sm font-normal'>Choose a tool based on your need, Image Editor, BG Remover, and more.</p>
              </div>
            </div>
            <div className='quick2 max-w-[340px] z-[10] min-h-[180px] group flex flex-col gap-4 border border-white/70 bg-white/10 rounded-md p-4'>
              <LuUpload size={30} className='transition-all duration-100 translate-y-0 group-hover:-translate-y-1' />
              <div className='text-lg font-semibold'>
                Upload an Image
                <p className='mt-2 text-sm font-normal'>Upload an image from your device in various formats like PNG, JPG, etc.</p>
              </div>
            </div>
            <div className='quick2 max-w-[340px] z-[10] min-h-[180px] group flex flex-col gap-4 border border-white/70 bg-white/10 rounded-md p-4'>
              <RiImageAiLine size={30} className='transition-all duration-100 group-hover:scale-110' />
              <div className='text-lg font-semibold'>
                Let Pixelo Work
                <p className='mt-2 text-sm font-normal'>Pixelo processes the image, Real-time preview for manual editing</p>
              </div>
            </div>
            <div className='quick2 max-w-[340px] z-[10] min-h-[180px] group flex flex-col gap-4 border border-white/70 bg-white/10 rounded-md p-4'>
              <FiDownload size={30} className='transition-all duration-100 translate-y-0 group-hover:translate-y-1' />
              <div className='text-lg font-semibold'>
                Download the Image
                <p className='mt-2 text-sm font-normal'>Download your edited image in your preffered format.</p>
              </div>
            </div>
          </div>
        </div>

        <FAQ />

      </div>
    </div>
  )
}

export default Home