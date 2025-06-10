import { useEffect } from 'react'
import { TiDeleteOutline } from "react-icons/ti";
import { IoIosArrowBack } from "react-icons/io";
import { GoArrowDown } from "react-icons/go";
import gsap from 'gsap';

const CompressPreview = (prop) => {
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
  }, [prop.compress])

  function formatSize(bytes) {
    const kb = bytes / 1024;
    const mb = kb / 1024;
    return kb < 1024
      ? `${kb.toPrecision(3)} KB`
      : `${mb.toPrecision(3)} MB`;
  }

  const format64Size = (bytes) => {
    if (bytes >= 1024 * 1024) { return (bytes / (1024 * 1024)).toFixed(2) + " MB"; }
    else { return (bytes / 1024).toFixed(2) + " KB"; }
  }

  const calculateImageSize = (base64String) => {
    const base64 = base64String.split(',')[1];
    const padding = (base64.endsWith("==")) ? 2 : (base64.endsWith("=")) ? 1 : 0;
    const sizeInBytes = (base64.length * 3) / 4 - padding;
    return format64Size(sizeInBytes);
  }

  return (
    <div className='w-[90%] md:w-3/4 mx-w-[1200px] mx-auto'>
      <div className='relative min-h-[60vh] flex flex-col bg-white overflow-hidden px-2 py-10 md:px-10 md:py-20 gap-20'>
        {prop.images && prop.compress.length <= 0 && (
          <div className='flex flex-col gap-20'>
            <div className='flex justify-between items-center w-full'>
              <button className='z-10 text-black rounded-md hover:cursor-pointer active:scale-95 border p-2 pr-4 md:text-xl flex gap-2 items-center' onClick={prop.back}><IoIosArrowBack />Back</button>
              <div className='z-10 right-40 flex justify-center items-center gap-2 md:text-lg'>Level:<select className=' bg-gray-200 px-3  py-2 rounded-md' value={prop.quality} onChange={(e) => { prop.setQuality(e.target.value) }}  >
                <option value="0.2F">70%</option>
                <option value="0.5F">50%</option>
                <option value="0.7F">30%</option>
              </select>
              </div>
              <button className='z-10 bg-green-500 outline-0 text-white rounded-md hover:cursor-pointer ring-green-300 active:scale-95 hover:ring-3 px-4 py-2 md:text-xl' disabled={prop.loading} onClick={prop.sendreq}>{prop.loading ? <p>Loading..</p> : <p>Compress</p>}</button>
            </div>
            <div className="w-full flex flex-col gap-6 px-2 md:px-20 h-auto">
              {prop.images.map((image, index) => (
                <div key={index} className='boxRef1 relative flex justify-evenly items-center border border-gray-200 shrink-0 overflow-hidden rounded-xl'>
                  <p className=' left-0 bg-green-400 text-white px-4 py-5'>{index + 1}</p>
                  <div className='w-full flex justify-between items-center px-2 md:px-5'>
                    <p key={index}> {image.name.length > 16 ? `${image.name.slice(0, 16)}...` : image.name}</p>
                  <p>Size: {formatSize(image.size)}</p>
                  </div>
                  <p className='cursor-pointer bg-red-400 hover:bg-red-500 px-3 py-5 text-white' onClick={() => { prop.remove((index)) }}><TiDeleteOutline size={25} /></p>
                </div>
              ))}
            </div>
          </div>
        )}

        {(prop.compress.length > 0) && (
          <div className='flex flex-col gap-20'>
            <div className='flex justify-between items-center w-full'>
              <button className='z-10 text-black rounded-md hover:cursor-pointer active:scale-95 border p-2 pr-4 md:text-xl flex gap-2 items-center' onClick={prop.back2}><IoIosArrowBack />Back</button>
            </div>
            <div className="w-full flex flex-col gap-6 px-2 md:px-10 h-auto">
              {prop.compress.map((image, index) => (
                <div key={index} className='boxRef2 relative flex justify-evenly items-center border border-gray-200 shrink-0 overflow-hidden rounded-xl'>
                  <div className=' left-0 bg-green-500 text-white px-3 md:px-4 py-6'>{index + 1}</div>
                  <div className='w-full flex justify-between items-center px-2 md:px-5'>
                    <p> {prop.images[index].name.length > 16 ? `${prop.images[index].name.slice(0, 16)}..` : prop.images[index].name}</p>
                    <div className='flex flex-col gap-1'>
                      <p className='text-sm md:text-base'>Before: {formatSize(prop.images[index].size)}</p>
                      <p className='text-sm md:text-base'>Now: {calculateImageSize(image)}</p>
                    </div>
                  </div>
                  <button onClick={(e) => { prop.download(image, `image-${index + 1}`); e.currentTarget.style.backgroundColor = "#16a34a"}} className='cursor-pointer bg-green-500 hover:bg-green-600 text-white px-2 md:px-3 py-6'><p className='hidden md:block'>Download </p><p className='md:hidden'><GoArrowDown size={22} /></p></button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CompressPreview

