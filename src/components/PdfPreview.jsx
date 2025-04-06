import React from 'react'
import { TiDeleteOutline } from "react-icons/ti";
import { IoIosArrowBack } from "react-icons/io";



const PdfPreview = (prop) => {

    return (
    <div className='w-full md:w-3/4 mx-auto'>
        
        <div className='relative flex md:justify-between md:items-center bg-white p-10 md:p-30 py-50 overflow-hidden'>
        <div className="flex gap-6 w-full overflow-x-scroll">
           {prop.images.map((image, index) => (
            <div key={index} className='relative border border-gray-200 w-[220px] md:w-[300px] shrink-0 overflow-hidden rounded-xl'>
            <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Selected ${index + 1}`}
            className={`${prop.images.length <=2  ? "w-full" : "w-full h-70 md:h-80"} object-top rounded `}
            onClick={()=>handleRemoveImage(index)}
            />
            {/* <div className='absolute top-0 bg-black/60 w-full h-80 text-white flex justify-center items-center'><RiDeleteBinLine size={60}/></div> */}
            <p className='absolute top-0 bg-gray-300 px-3 py-1'>{index + 1}</p>
            <p className='absolute top-0 right-0 bg-gray-300 px-2 py-1' onClick={()=>{prop.remove((index))}}><TiDeleteOutline size={25}/></p>
            </div>
          ))}

        </div>
        <div>
            <button className='absolute top-10 left-5 md:left-10 text-black rounded-md hover:cursor-pointer active:scale-95 border p-2 pr-4 text-xl flex gap-2 items-center' onClick={prop.back}><IoIosArrowBack/>Back</button>
            <button className='absolute top-10 right-5 md:right-10 bg-blue-600 text-white rounded-md hover:cursor-pointer ring-blue-300 active:scale-95 hover:ring-3 px-4 py-2 text-xl font-semibold' onClick={prop.download}>Download</button>
        </div>
        </div>
      
    </div>
  )
}

export default PdfPreview


        //   <div className="mt-4 grid grid-cols-3 gap-2">
        //   {images.map((image, index) => (
        //     <img
        //     key={index}
        //     src={URL.createObjectURL(image)}
        //     alt={`Selected ${index + 1}`}
        //     className="w-40 h-40 object-cover rounded"
        //     onClick={()=>handleRemoveImage(index)}
        //     />
        //   ))}
        // <div className="mt-4 p-2 bg-green-700 rounded">
        //   <p className="text-sm">PDF Generated Successfully!</p>
        //   <button onClick={generatePDF}>Download</button>
        // </div>
        //         </div>
        //         )}