import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { RiArrowDownSLine } from "react-icons/ri";
import '../App.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
   const [open, setOpen] = useState(false);

  return (
    <nav className="w-full text-black px-6 md:px-10 py-4 shadow-md font-semibold bg-transparent">
      <div className="w-full flex justify-between items-center relative z-20">
       <div>
        <NavLink to="/" className="text-2xl font-bold">
        <img src="/img/logo.png" className="w-[120px]" alt="" />
        </NavLink>
       </div>

        <ul className="hidden md:flex md:gap-5 lg:gap-8 ">
            <li><NavLink to={'/'}
                className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-600" : ""}`}>
                Home
              </NavLink>
            </li>
            <li><NavLink to={'/image-editor'}
                className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-600" : ""}`}>
                Image Editor
              </NavLink>
            </li>
            <li className="hidden lg:block"><NavLink to={'/bg-remover'}
                className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-600" : ""}`}>
                BG Remover
              </NavLink>
            </li>
            <li><NavLink to={'/text-to-image'}
                className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-600" : ""}`}>
                Generate Image
              </NavLink>
            </li>
            <li>
        <div 
      className="relative"
      onMouseEnter={() => setOpen(true)} 
      onMouseLeave={() => setOpen(false)}
    >
      {/* 🔘 Dropdown Trigger Button */}
      <button className="hover:text-gray-400 flex justify-center items-center gap-1 bg-white">
        More Tools 
        <RiArrowDownSLine size={18} />
      </button>

      {/* 📜 Dropdown Menu */}
      <ul
        className={`absolute left-0 mt-2 w-52 p-1 bg-white text-gray-800 shadow-xl border border-gray-300 rounded-md transition-all duration-300 ease transform z-50
          ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 invisible scale-95 -translate-y-5"}`}
      >
        <li>
          <NavLink to="/pdf-maker" className="block px-4 py-2 hover:bg-blue-500 transition-all duration-100 rounded-sm hover:text-white">
            PDF Maker
          </NavLink>
        </li>
        <li>
          <NavLink to="/image-convertor" className="block px-4 py-2 hover:bg-blue-500 transition-all duration-100 rounded-sm hover:text-white">
            Image Convertor 
          </NavLink>
        </li>
        <li>
          <NavLink to="/bg-remover" className="block lg:hidden px-4 py-2 hover:bg-blue-500 transition-all duration-100 rounded-sm hover:text-white">
            BG Remover 
          </NavLink>
        </li>
        <li>
          <NavLink to="/image-detector" className="block px-4 py-2 hover:bg-blue-500 transition-all duration-100 rounded-sm hover:text-white">
            Image Detector
          </NavLink>
        </li>
        <li>
          <NavLink to="/image-enhancer" className="block px-4 py-2 hover:bg-blue-500 transition-all duration-100 rounded-sm hover:text-white">
            Image Enhancer
          </NavLink>
        </li>
        <li>
          <NavLink to="/image-compressor" className="block px-4 py-2 hover:bg-blue-500 transition-all duration-100 rounded-sm hover:text-white">
            Image Compressor
          </NavLink>
        </li>
      </ul>
    </div>
        </li>
        </ul>

        <div>
        <NavLink to="/signup" className="hidden md:block bg-blue-500 text-white px-2 md:px-4 py-2 rounded-lg hover:bg-blue-600">
          Sign up
        </NavLink>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {(
        <div className="md:hidden absolute top-18 left-0 w-full z-10">
          <ul className={`flex flex-col gap-4 bg-white text-right px-5 py-5 shadow-xl ${isOpen ? "opacity-100 scale-100 translate-y-0 transition-all duration-500" : "opacity-0 invisible -translate-y-15 transition-all duration-200"}`}>
            <li>
              <NavLink to="/" onClick={()=>setIsOpen(false)} className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
                Image editor
              </NavLink>
            </li>
            <li>
              <NavLink to="/bg-remover" onClick={()=>setIsOpen(false)} className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
                BG remover
              </NavLink>
            </li>
            <li>
              <NavLink to="pdf-maker" onClick={()=>setIsOpen(false)} className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
                PDF maker
              </NavLink>
            </li>
            <li>
              <NavLink to="/text-to-image" onClick={()=>setIsOpen(false)} className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
                Text-to-image
              </NavLink>
            </li>
            <li>
              <NavLink to="/image-compressor" onClick={()=>setIsOpen(false)} className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
                Image compressor
              </NavLink>
            </li>
            <li>
              <NavLink to="/image-convertor" onClick={()=>setIsOpen(false)} className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
                Image convertor
              </NavLink>
            </li>
            <li>
              <NavLink to="/image-detector" onClick={()=>setIsOpen(false)} className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
                Image detector
              </NavLink>
            </li>
            <li>
              <NavLink to="/image-enhancer" onClick={()=>setIsOpen(false)} className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
                Image enhancer
              </NavLink>
            </li>
            <li>
          <NavLink
            to="/signin"
            onClick={() => setIsOpen(false)}
            className="bg-blue-500 px-4 py-2 rounded-lg w-full text-white text-center hover:bg-blue-600 block"
            >
            Sign In
          </NavLink>
          </li>
            </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
