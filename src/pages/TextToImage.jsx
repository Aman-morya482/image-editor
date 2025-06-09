import { useContext, useEffect, useRef, useState } from 'react'
import { userContext } from '../utils/ContextProvider';
import FirstLogin from "../components/FirstLogin";
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from "react-loading-skeleton";
import gsap from "gsap";

import { PiMagicWandDuotone } from "react-icons/pi";
import { FaArrowDownLong } from "react-icons/fa6";
import { toast } from 'react-toastify';

const TextToImage = () => {
  const { user, url } = useContext(userContext);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [login, setLogin] = useState(false);
  const [fetchImage, setFetchImage] = useState([]);
  const [show, setShow] = useState(false);
  const [imageNum, setImageNum] = useState(0);
  const imageNumRef = useRef(0)
  const buttonRef = useRef(null);
  const [randomPrompts, setRandomPrompts] = useState([]);
  const samplePrompts = ["Neon tiger in jungle 🐯", "Retro car on beach 🚗", "Pirate ship in space 🏴‍☠️", "Penguin enjoying wave 🐧", "Spaceship flying through storm 🚀", "Fairy sitting on mushroom 🧚", "Tiny dragon on shoulder 🐉", "Ancient castle in rain 🏰", "Dinosaur eating ice cream 🦖", "Penguin drinking coffee at cafe ☕", "Ice castle in forest ❄️", "Rainbow bridge over mountains 🌈", "Sunflowers under starry sky 🌻", "Rainy street with neon lights 🌧️"];
  const aiText = useRef(null);
  const [load, setLoad] = useState(false); // Renamed from loading
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    gsap.fromTo(aiText.current, { y: "5%", opacity: 0, scale: 0.93 }, {
      y: "0%",
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "power1.inOut"
    });
    gsap.fromTo(".boxRef", { y: "5%", opacity: 0, scale: 0.93 }, {
      y: "0%",
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "power1.inOut",
      stagger: 0.4
    });
  }, [])

  useEffect(() => {
    const shuffled = [...samplePrompts].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    setRandomPrompts(selected);

    const handleEnter = (e) => {
      if (e.key === "Enter") { buttonRef.current.click() }
    }
    window.addEventListener("keydown", handleEnter);
    return () => { window.removeEventListener("keydown", handleEnter) }
  }, [])

  const fetchAiImage = async () => {
    if (load || !hasMore) return;

    setLoad(true);
    try {
      const response = await fetch(`${url}/download/ai-image?req=${imageNumRef.current}`);
      const data = await response.json();
      if (data) {
        setFetchImage(data);
        setShow(true);
      }
    } catch (err) {
      console.error("Image fetch failed:", err);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchAiImage()
  }, []);


  const sendToBackend = async () => {
    if (prompt.length <= 0) return toast.info("Write some prompt");
    setImage("");
    setLoading(true);
    setShow(false);

    try {
      const response = await fetch(`${url}/api/getImage?prompt=${prompt}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Generation failed');
      const data = await response.json();
      setImage(data);
      console.log(data);
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setLoading(false);
      setShow(false)
      toast.error("Something went wrong!!");
    } finally { setLoading(false) }
  };

  const download = async () => {
    if (user) {
      try {
        const result = await fetch(`${url}/download/ai-download?email=${user.value.email}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user.value.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ image: `data:image/jpeg;base64,${image}` }),
        });
        console.log("download executed");
        console.log("res", result);
        return result;
      } catch (error) {
        console.log("error", error);
        toast.error("Something went wrong")
      }
    }
  }

  const handleDownload = async () => {
    !user && setLogin(true);
    if (!user) return pendingImage();
    const result = await download();
    console.log(result)
    if (result.status == 200) {
      const link = document.createElement("a");
      link.href = `data:image/jpeg;base64,${image}`;
      link.download = "ai-image.jpeg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  const pendingImage = () => {
    const item = { image: `${image}`, format: "jpeg", name: "ai-image", expiry: 86400000 }
    localStorage.setItem("pendingImage", JSON.stringify(item))
  }

  const cancelLogin = () => { setLogin(false) }

  return (
    <div className='gird grid-cols-1 place-items-center relative'>
      <div className={`${!image ? "min-h-screen" : "min-h-[50vh] xl:min-h-[30vh] md:mt-20"} ${loading ? "md:mt-20" : ""} flex flex-col items-center justify-center gap-4 px-2 md:px-10`}>
        <img src="/img/artificial-intelligence.gif" alt="animated-svg" className='w-[120px] absolute top-7 right-7 hidden md:block' />
        <p ref={aiText} className={`text-5xl ${image || loading ? "" : "mt-20"} md:text-7xl font-bold tracking-wide text-center animated-gradient-text leading-[50px] md:leading-[90px]`}>AI Image Generator</p>
        <p className='mb-4 font-semibold text-gray-600 tracking-wide text-center'>Turn your imagination into stunning images powered by AI.</p>
        <div className='flex flex-wrap justify-center items-center gap-2'>
          <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder='What do you want to see?' className='border-2 border-gray-500 rounded-md w-xs sm:w-lg md:w-xl p-3 focus:outline-blue-400 ' />
          <button onClick={sendToBackend} ref={buttonRef} className='p-3 bg-gradient-to-r from-blue-600 via-purple-800 to-red-500 rounded-md text-white ring-blue-300 active:scale-95 hover:ring-2 hover:cursor-pointer flex gap-2 items-center'><PiMagicWandDuotone size={24} />{loading ? "Processing..." : "Generate Image"}</button>
        </div>
        {!image && !loading && (
          <div className="flex flex-wrap justify-center items-center md:justify-start md:items-start gap-3 w-full md:w-3xl mb-20">
            {randomPrompts.map((prompt, idx) => (
              <div key={idx} className='bg-gradient-to-br rounded-full from-red-400 via-purple-500 to-blue-400 p-[1px] active:scale-95'>
                <div onClick={(e) => setPrompt(e.target.innerText)}
                  className="md:px-4 py-2 px-2 rounded-full border-2 text-gray-500  hover:text-black border-gray-400 hover:border-blue-500 bg-gray-50 text-xs md:text-sm cursor-pointer transition">
                  {prompt}
                </div>
              </div>))}
          </div>
        )}
        {!image && loading && (
          <div className='w-2xs md:w-xl h-[300px] md:h-[600px] rounded-xl'>
            <Skeleton variant="text" className='w-full h-full'
              style={{ margin: "10px", backgroundColor: "lightgray" }}
              animation="wave"
            />
          </div>
        )}

        {show && !load && fetchImage.length > 0 && !image && (
          <div className='w-full max-w-[1800px]'>
            <p className='text-center text-4xl my-6 font-semibold'>Generated By Users</p>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10'>
              {fetchImage.map((image, ind) => (
                <div key={ind}>
                  <img src={image} alt={`Generated ${ind}`} className='rounded-xl w-[300px] h-[400px] object-cover' />
                </div>
              ))}
            </div>
          </div>
        )}

        {load && (
          <p className="text-center my-4 text-gray-500">Loading images...</p>
        )}
      </div>

      {login && <FirstLogin open={setLogin} />}

      <div className='w-full flex flex-col justify-center items-center pt-5 pb-10 md:p-5'>
        {image && !loading &&
          <div className='relative'>
            <img className='w-2xs md:w-xl h-[300px] md:h-[600px] rounded-xl' src={`data:image/jpeg;base64,${image}`} ></img>
            <button onClick={() => handleDownload()} title='Download image' className='absolute top-4 right-4 bg-white/10 text-white py-2 px-3 rounded-md '><FaArrowDownLong size={20} /></button>
          </div>
        }
      </div>
    </div>
  )
}

export default TextToImage
