import React from 'react'
import { TiDeleteOutline } from "react-icons/ti";
import { IoIosArrowBack } from "react-icons/io";
import FirstLogin from './FirstLogin';


const PdfPreview = (prop) => {

  const {images,setImages,login,cancelLogin,pdf,setPdf,loading, createPdf,downloadPdf,remove} = prop;

    return (

    <div className='w-full md:w-3/4 mx-auto'>
        
        <div className='relative flex flex-col md:justify-between bg-white items-center px-5 lg:p-30 py-50 overflow-hidden my-10'>
        <p className='absolute top-0 md:top-6 text-center text-4xl font-semibold text-gray-600'>{!pdf ? "Images Review" : "PDF Preview"}</p>
        <div>
            <button className='absolute top-15 left-5 md:left-10 text-black rounded-md hover:cursor-pointer active:scale-95 border p-2 pr-4 text-xl flex gap-2 items-center' onClick={()=>pdf ? setPdf("") : setImages("")}><IoIosArrowBack/>Back</button>
            <button className='absolute top-15 right-5 md:right-10 bg-amber-500 text-white rounded-md hover:cursor-pointer ring-amber-300 active:scale-95 hover:ring-3 px-4 py-2 text-xl font-semibold' onClick={pdf? downloadPdf : createPdf}>{pdf ? "Download" : loading ? "Converting..." : "Create PDF"}</button>
        </div>
        
        {!pdf && images && ( 
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 w-full overflow-x-scroll border-gray-200 border-2 p-5 rounded-md">
           {images.map((image, index) => (
             <div key={index} className='relative border border-gray-300 w-[260px] md:w-[300px] shrink-0 overflow-hidden rounded-md'>
            <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Selected ${index + 1}`}
            className={`${images.length <=2  ? "w-full" : "w-full h-70 md:h-80"} object-top rounded-md `}
            onClick={()=>handleRemoveImage(index)}
            />
            {/* <div className='absolute top-0 bg-black/60 w-full h-80 text-white flex justify-center items-center'><RiDeleteBinLine size={60}/></div> */}
            <p className='absolute top-0 bg-gray-300 px-3 py-1'>{index + 1}</p>
            <p className='absolute top-0 right-0 bg-red-400 hover:bg-red-500 text-white px-2 py-1 cursor-pointer' title='Remove image' onClick={()=>{remove((index))}}><TiDeleteOutline size={25}/></p>
            </div>
          ))}
        </div>
        )}
        {pdf && images && (
          <iframe
           src={`${pdf}#toolbar=0`}
           width="90%"
           height="600px"
           style={{ border: '1px solid #ccc', borderRadius: '8px', marginTop:'30px' }}
           title="PDF Preview"
          />
        )}
        
        </div>
      

        {login && <FirstLogin open={cancelLogin}/>}
    </div>
  )
}

export default PdfPreview

