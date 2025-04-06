import React from 'react'
import { NavLink } from 'react-router-dom'

const Editor = () => {
  return (
    <div>
      <div className='flex justify-center items-center h-screen w-full max-w-[1800px] bg-gray-200'>
      <NavLink to='/edit-image'><p className='px-3 py-2 bg-blue-600 rounded-md text-white'>Start Editing</p></NavLink>
      </div>
    </div>
  )
}

export default Editor
