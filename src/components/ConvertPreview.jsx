import { useEffect } from 'react'
import { TiDeleteOutline } from "react-icons/ti";
import { IoIosArrowBack } from "react-icons/io";
import { GoArrowDown } from "react-icons/go";
import gsap from 'gsap';

const ConvertPreview = (prop) => {
  useEffect(() => {
    gsap.fromTo(".boxRef1", { y: "8%", opacity: 0 }, {
      y: "0%",
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
      stagger: 0.2,
    });
  }, [])
  useEffect(() => {
    gsap.fromTo(".boxRef2", { y: "8%", opacity: 0 }, {
      y: "0%",
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
      stagger: 0.2,
    });
  }, [prop.convert])

  return (
    <div className='w-[90%] md:w-3/4 mx-w-[1200px] mx-auto'>
      <div className='relative min-h-[60vh] flex flex-col bg-white overflow-hidden px-2 py-10 md:px-10 md:py-20 my-10 gap-20'>
        {prop.images && prop.convert.length <= 0 && (
          <div className='flex flex-col gap-20'>
            <div className='flex justify-between items-center w-full'>
              <button className='z-10 text-black rounded-md hover:cursor-pointer active:scale-95 border p-2 pr-4 md:text-xl flex gap-2 items-center' onClick={prop.back}><IoIosArrowBack />Back</button>
              <button className='z-10 bg-blue-600 outline-0 text-white rounded-md hover:cursor-pointer ring-blue-300 active:scale-95 hover:ring-3 px-4 py-2 md:text-xl' disabled={prop.loading} onClick={prop.sendreq}>{prop.loading ? <p>Loading..</p> : <p>Convert</p>}</button>
            </div>
            <div className="w-full flex flex-col gap-6 px-2 md:px-10 h-auto">
              {prop.images.map((image, index) => (
                <div key={index} className='boxRef1 relative flex justify-evenly items-center border border-gray-200 shrink-0 overflow-hidden rounded-xl'>
                  <p className=' left-0 bg-blue-400 text-white px-4 py-5'>{index + 1}</p>
                  <div className='w-full flex justify-between items-center px-2 md:px-5'>
                    <p key={index}> {image.name.length > 20 ? `...${image.name.slice(-20)}` : image.name}</p>
                  </div>
                  <p className='cursor-pointer bg-red-400 hover:bg-red-500 text-white px-3 py-5' onClick={() => { prop.remove((index)) }}><TiDeleteOutline size={25} /></p>
                </div>
              ))}
            </div>
          </div>
        )}
        {prop.convert.length > 0 && (
          <div className='flex flex-col gap-20'>
            <div className='flex justify-between items-center w-full'>
              <button className='z-10 text-black rounded-md hover:cursor-pointer active:scale-95 border p-2 pr-4 md:text-xl flex gap-2 items-center' onClick={prop.back2}><IoIosArrowBack />Back</button>
            </div>
            <div className="w-full flex flex-col gap-6 px-2 md:px-10 h-auto">
              {prop.convert.map((image, index) => (
                <div key={index} className='boxRef2 relative flex justify-evenly items-center border border-gray-200 shrink-0 overflow-hidden rounded-xl'>
                  <p className=' left-0 bg-blue-500 text-white px-4 py-5'>{index + 1}</p>
                  <div className='w-full flex justify-between items-center px-2 md:px-5'>
                    <p>
                      {(() => {
                        const nameWithoutExt = prop.images[index].name.replace(/\.[^/.]+$/, '');
                        const newName = nameWithoutExt + '.' + prop.type;
                        return newName.length > 20 ? newName.slice(-20) : newName;
                      })()}                      </p>
                  </div>
                  <button onClick={(e) => { prop.download(image, `image-${index + 1}.${prop.type}`); e.currentTarget.style.backgroundColor = "#22c55e" }} className='cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-3 py-5'><p className='hidden md:block'>Download</p><p className='md:hidden'><GoArrowDown size={22} /></p></button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConvertPreview

