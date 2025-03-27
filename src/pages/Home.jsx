import React from 'react'
import { NavLink } from 'react-router-dom'
import ImageEditor from './ImageEditor'

const Home = () => {
  return (
    <div>
      <div className='flex justify-center items-center h-screen'>
      <NavLink to='/image-editor'><p className='px-3 py-2 bg-blue-600 rounded-md text-white'>Start Editing</p></NavLink>
      </div>
    </div>
  )
}

export default Home
