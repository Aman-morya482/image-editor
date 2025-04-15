import { useContext, useEffect, useState } from "react";
import { userContext } from "../utils/ContextProvider";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { RiArrowDownSLine } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import '../App.css'
import { use } from "react";
import EditUser from "./EditUser";
import LogoutConfirm from "./LogoutConfirm";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
   const [open, setOpen] = useState(false);
   const [confirm,setConfirm] = useState(false);
   const[click,setClick] = useState(false);
   const[edit,setEdit] = useState(false);

   const {user,logout} = useContext(userContext);

  return (
    <nav className="w-full text-black px-2 md:px-10 py-4 shadow-sm font-semibold bg-transparent">
      <div className="w-full flex justify-between items-center relative">
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
      <button className="hover:text-gray-400 flex justify-center items-center gap-1">
        More Tools 
        <RiArrowDownSLine size={18} />
      </button>

      {/* 📜 Dropdown Menu */}
      <ul
        className={`absolute left-0 mt-2 w-52 p-1 bg-white text-gray-800 shadow-xl border border-gray-300 rounded-md transition-all duration-300 ease transform z-50
          ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 invisible scale-95 -translate-y-5"}`}
      >
        <li>
          <NavLink to="/pdf-maker" className={({isActive})=>`block px-4 py-2 hover:bg-blue-500 transition-all duration-100 rounded-sm hover:text-white ${isActive ? "bg-blue-600 text-white" : ""}`}>
            PDF Maker
          </NavLink>
        </li>
        <li>
          <NavLink to="/image-convertor" className={({isActive})=>`block px-4 py-2 hover:bg-blue-500 transition-all duration-100 rounded-sm hover:text-white ${isActive ? "bg-blue-600 text-white" : ""}`}>
            Image Convertor 
          </NavLink>
        </li>
        <li>
          <NavLink to="/bg-remover" className={({isActive})=>`block md:hidden px-4 py-2 hover:bg-blue-500 transition-all duration-100 rounded-sm hover:text-white ${isActive ? "bg-blue-600 text-white" : ""}`}>
            BG Remover 
          </NavLink>
        </li>
        <li>
          <NavLink to="/image-detector" className={({isActive})=>`block px-4 py-2 hover:bg-blue-500 transition-all duration-100 rounded-sm hover:text-white ${isActive ? "bg-blue-600 text-white" : ""}`}>
            Image Analyzer
          </NavLink>
        </li>
        <li>
          <NavLink to="/image-enhancer" className={({isActive})=>`block px-4 py-2 hover:bg-blue-500 transition-all duration-100 rounded-sm hover:text-white ${isActive ? "bg-blue-600 text-white" : ""}`}>
            Image Enhancer
          </NavLink>
        </li>
        <li>
          <NavLink to="/image-compressor" className={({isActive})=>`block px-4 py-2 hover:bg-blue-500 transition-all duration-100 rounded-sm hover:text-white ${isActive ? "bg-blue-600 text-white" : ""}`}>
            Image Compressor
          </NavLink>
        </li>
      </ul>
    </div>
        </li>
        </ul>
  <div>
{
        !user ? 
        (<NavLink to="/login" className="hidden md:block bg-blue-500 text-white px-2 md:px-4 py-2 rounded-lg hover:bg-blue-600">
          Login
        </NavLink>) :  
        (<div>
        <FaCircleUser size={34} className="ml-22 md:ml-0 relative text-slate-800 hover:cursor-pointer hover:ring-3 ring-gray-300 rounded-[50%]" onClick={()=>setClick(!click)}/>
        <div className={`absolute top-12 right-2 z-100 bg-white border border-gray-300 rounded-md w-[150px]  ${click ? "block" : "hidden"}  `}>
          <ul className="flex flex-col gap-1 font-normal">
            <li className="p-2">{user.value}</li>
            <li className="flex items-center gap-2 hover:bg-gray-200 hover:cursor-pointer p-2" onClick={()=>{setEdit(true)}}>Edit<FaRegEdit size={18} className="mb-1"/></li>
            <li className="text-red-500 font-semibold hover:bg-red-500 hover:text-white hover:cursor-pointer p-2 flex items-center gap-2" onClick={()=>setConfirm(true)}>Logout<IoIosLogOut size={20}/></li>
          </ul>
        </div>
        {edit && <EditUser open={edit} setClick={setClick} setOpen={setEdit}/>}
        {confirm && <LogoutConfirm logout={logout} setClick={setClick} setConfirm={setConfirm}/>}
        </div> 
        )
}
  </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {(
        <div className="md:hidden absolute top-18 left-0 w-full z-50">
          <ul className={`flex flex-col gap-4 bg-white text-right px-5 py-5 shadow-xl ${isOpen ? "opacity-100 scale-100 translate-y-0 transition-all duration-500 block" : "opacity-0 hidden -translate-y-15 transition-all duration-200"}`}>
            <li>
              <NavLink to="/" onClick={()=>setIsOpen(false)} className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/image-editor" onClick={()=>setIsOpen(false)} className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
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
                Image Analyzer
              </NavLink>
            </li>
            <li>
              <NavLink to="/image-enhancer" onClick={()=>setIsOpen(false)} className={({ isActive }) =>`hover:text-gray-400 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
                Image enhancer
              </NavLink>
            </li>
            <li>
          <NavLink
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="bg-gray-300 px-4 py-2 rounded-lg w-full text-center hover:bg-blue-600 block"
            >
            Sign up
          </NavLink>
          </li>
            <li>
          <NavLink
            to="/login"
            onClick={() => setIsOpen(false)}
            className="bg-blue-500 px-4 py-2 rounded-lg w-full text-white text-center hover:bg-blue-600 block"
            >
            Login
          </NavLink>
          </li>
            </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
