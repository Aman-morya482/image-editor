import React from 'react'
import { NavLink } from 'react-router-dom'

const BgRemover = () => {
  return (
    <div>
      <div className='flex justify-center items-center h-screen'>
        <button className='px-3 py-2 bg-blue-600 rounded-md text-white'>Upload Image</button>
      </div>
    </div>
  )
}

export default BgRemover;