import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import SavedDrafts from '../components/SavedDrafts'

const Editor = () => {
  
  const navigate = useNavigate()

  const handleImageUpload = (e)=>{
    const file = e.target.files[0];
    console.log(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem("uploadedImage", reader.result);
        console.log(reader.result);
        navigate("/edit-image", { state: { newImage: reader.result}});
    }
    reader.readAsDataURL(file);
    }
  }

  return (
    <div>
      <div className='flex justify-center items-center h-screen w-full max-w-[1800px] bg-gray-200'>
      {/* <NavLink to='/edit-image'><p className='px-3 py-2 bg-blue-600 rounded-md text-white'>Start Editing</p></NavLink> */}
      <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
        Upload Image
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label> 
      </div>

      {/* <SavedDrafts/> */}

    </div>
  )
}

export default Editor
