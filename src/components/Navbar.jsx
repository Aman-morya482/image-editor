import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import '../App.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
   const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-900 text-white px-10 py-4 shadow-lg">
      <div className="w-full flex justify-between items-center gap-2 px-4">
       <div>
        <NavLink to="/" className="text-2xl font-bold">
        Image Editor
        </NavLink>
       </div>

        <ul className="hidden md:flex md:gap-4">
            <li><NavLink to={'/'}
                className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-400 border-b-2 border-blue-400" : ""}`}>
                Image Editor
              </NavLink>
            </li>
            <li><NavLink to={'/bg-remover'}
                className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-400 border-b-2 border-blue-400" : ""}`}>
                BG remover
              </NavLink>
            </li>
            <li><NavLink to={'/pdf-maker'}
                className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-400 border-b-2 border-blue-400" : ""}`}>
                PDF maker
              </NavLink>
            </li>
            <li><NavLink to={'/text-to-image'}
                className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-400 border-b-2 border-blue-400" : ""}`}>
                Text-to-image
              </NavLink>
            </li>
            <li 
          className="relative group more-tool"
        >
          <button onClick={() => setOpen(!open)} className="hover:text-gray-400 flex items-center gap-1">
            More Tools ▼
          </button>

          <ul className={`absolute left-0 mt-1 w-48 bg-white text-gray-800 shadow-lg rounded-md transition-opacity duration-300 more-nav
              ${open ? "opacity-100 visible" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"}`}
          >
            <li>
              <NavLink onClick={()=>setOpen(false)} to="/image-convertor" className="block px-4 py-2 hover:bg-gray-200">
                Image convertor 
              </NavLink>
            </li>
            <li>
              <NavLink to="/image-detector" onClick={()=>setOpen(false)} className="block px-4 py-2 hover:bg-gray-200">
                Image Detector
              </NavLink>
            </li>
            <li>
              <NavLink to="/image-enhancer" onClick={()=>setOpen(false)} className="block px-4 py-2 hover:bg-gray-200">
                Image enhancer
              </NavLink>
            </li>
            <li>
              <NavLink to="/image-compressor" onClick={()=>setOpen(false)} className="block px-4 py-2 hover:bg-gray-200">
                Image Compressor
              </NavLink>
            </li>
          </ul>
        </li>
        </ul>

        <div>
        <NavLink to="/signin" className="hidden md:block bg-blue-500 px-2 md:px-4 py-2 rounded-lg hover:bg-blue-600">
          Sign In
        </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden  mt-4 space-y-4 text-right">
          {/* {["/", "/BG remover", "/PDF maker", "/Text-to-image","/image-convertor"].map((path, index) => (
            <NavLink
              key={index}
              to={path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>`block py-2 hover:text-gray-400 ${isActive ? "text-blue-400 font-bold" : ""}`}>
              {path === "/" ? "Image editor" : path.replace("/", "")}
            </NavLink>
          ))} */}
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink to="/" onClick={()=>setIsOpen(false)} className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-400 border-b-2 border-blue-400" : ""}`}>
                Image editor
              </NavLink>
            </li>
            <li>
              <NavLink to="/bg-remover" onClick={()=>setIsOpen(false)} className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-400 border-b-2 border-blue-400" : ""}`}>
                BG remover
              </NavLink>
            </li>
            <li>
              <NavLink to="pdf-maker" onClick={()=>setIsOpen(false)} className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-400 border-b-2 border-blue-400" : ""}`}>
                PDF maker
              </NavLink>
            </li>
            <li>
              <NavLink to="/text-to-image" onClick={()=>setIsOpen(false)} className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-400 border-b-2 border-blue-400" : ""}`}>
                Text-to-image
              </NavLink>
            </li>
            <li onClick={() => setOpen(!open)} className="hover:text-gray-400">
            More Tools ▼
            </li>
            <ul className={`${open ? "visible flex flex-col gap-4" : "hidden invisible group-hover:opacity-100 group-hover:visible"}`}>
            <li>
              <NavLink to="/image-compressor" onClick={()=>setIsOpen(false)} className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-400 border-b-2 border-blue-400" : ""}`}>
                Image compressor
              </NavLink>
            </li>
            <li>
              <NavLink to="/image-convertor" onClick={()=>setIsOpen(false)} className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-400 border-b-2 border-blue-400" : ""}`}>
                Image convertor
              </NavLink>
            </li>
            <li>
              <NavLink to="/image-detector" onClick={()=>setIsOpen(false)} className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-400 border-b-2 border-blue-400" : ""}`}>
                Image detector
              </NavLink>
            </li>
            <li>
              <NavLink to="/image-enhancer" onClick={()=>setIsOpen(false)} className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-400 border-b-2 border-blue-400" : ""}`}>
                Image enhancer
              </NavLink>
            </li>
              </ul>
            <li>
          <NavLink
            to="/signin"
            onClick={() => setIsOpen(false)}
            className="bg-blue-500 px-4 py-2 rounded-lg w-full text-center hover:bg-blue-600 block"
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
