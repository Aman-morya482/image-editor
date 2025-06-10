import { useContext, useEffect, useState } from "react";
import { userContext } from "../utils/ContextProvider";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import '../App.css'
import SavedDrafts from "./SavedDrafts";
import LogoutConfirm from "./LogoutConfirm";
import EditUser from "./EditUser";

import { Menu, X } from "lucide-react";
import { RiArrowDownSLine } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [draftOpen, setDraftOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [click, setClick] = useState(false);
  const [edit, setEdit] = useState(false);
  const { user, logout } = useContext(userContext);
  const location = useLocation();
  const showDraft = location.pathname === "/" || location.pathname === "/image-editor" || location.pathname === "/edit-image";

  useEffect(() => {
    gsap.fromTo(".navRef", { scale: 1, x: "-20%", opacity: 0 }, {
      x: "0%",
      scale: 1,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power1.inOut"
    });
  }, [])

  return (
    <nav className="relative w-full text-black border-2 border-gray-200 bg-white font-semibold z-50 nav">
      <div className="w-full flex justify-between items-center relative  px-2 md:px-10 py-4">
        <div>
          <NavLink to="/" className="text-2xl font-bold">
            <img src="/img/logo.png" className="navRef w-[100px] md:w-[120px]" alt="" />
          </NavLink>
        </div>

        <ul className="hidden md:flex md:gap-5 lg:gap-8 ">
          <li><NavLink to={'/'}
            className={({ isActive }) => `navRef hover:text-gray-400 ${isActive ? "text-blue-600" : ""}`}>
            Home
          </NavLink>
          </li>
          <li><NavLink to={'/image-editor'}
            className={({ isActive }) => `navRef hover:text-gray-400 ${isActive ? "text-blue-600" : ""}`}>
            Image Editor
          </NavLink>
          </li>
          <li className="hidden lg:block"><NavLink to={'/bg-remover'}
            className={({ isActive }) => `navRef hover:text-gray-400 ${isActive ? "text-blue-600" : ""}`}>
            BG Remover
          </NavLink>
          </li>
          <li><NavLink to={'/text-to-image'}
            className={({ isActive }) => `navRef hover:text-gray-400 ${isActive ? "text-blue-600" : ""}`}>
            Generate Image
          </NavLink>
          </li>
          <li>
            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button className="navRef hover:text-gray-400 flex justify-center items-center gap-1 cursor-pointer">
                More Tools
                <RiArrowDownSLine size={18} />
              </button>

              <ul
                className={`absolute left-0 mt-2 w-52 p-1 bg-white text-gray-800 shadow-xl border border-gray-300 rounded-md transition-all duration-300 ease transform z-50
          ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 invisible scale-95 -translate-y-5"}`}
              >
                <li>
                  <NavLink to="/pdf-maker" onClick={() => setOpen(false)} className={({ isActive }) => `block px-4 py-2 hover:bg-blue-500 transition-all duration-100 rounded-sm hover:text-white ${isActive ? "bg-blue-600 text-white" : ""}`}>
                    PDF Maker
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/bg-remover" onClick={() => setOpen(false)} className={({ isActive }) => `block lg:hidden px-4 py-2 hover:bg-blue-500 transition-all duration-100 rounded-sm hover:text-white ${isActive ? "bg-blue-600 text-white" : ""}`}>
                    BG Remover
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/image-detector" onClick={() => setOpen(false)} className={({ isActive }) => `block px-4 py-2 hover:bg-blue-500 transition-all duration-100 rounded-sm hover:text-white ${isActive ? "bg-blue-600 text-white" : ""}`}>
                    Image Reader
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/image-enhancer" onClick={() => setOpen(false)} className={({ isActive }) => `block px-4 py-2 hover:bg-blue-500 transition-all duration-100 rounded-sm hover:text-white ${isActive ? "bg-blue-600 text-white" : ""}`}>
                    Image Enhancer
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/image-convertor" onClick={() => setOpen(false)} className={({ isActive }) => `block px-4 py-2 hover:bg-blue-500 transition-all duration-100 rounded-sm hover:text-white ${isActive ? "bg-blue-600 text-white" : ""}`}>
                    Image Convertor
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/image-compressor" onClick={() => setOpen(false)} className={({ isActive }) => `block px-4 py-2 hover:bg-blue-500 transition-all duration-100 rounded-sm hover:text-white ${isActive ? "bg-blue-600 text-white" : ""}`}>
                    Image Compressor
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>

        <div className="flex gap-6 items-center">
          <NavLink to="/login" className={`${user ? "hidden" : "block"} navRef bg-blue-500 text-white px-4 py-2 text-sm md:text-base rounded-lg hover:bg-blue-600`}>
            Login
          </NavLink>

          <div>
            <div className="flex gap-6">
              {user &&
                <p className={`${user ? "block" : "hidden"} navRef ml-22 md:ml-0 relative text-white bg-gradient-to-br from-blue-400 to-violet-700 py-[8px] px-[14px] text-xl rounded-full uppercase hover:cursor-pointer hover:ring-3 ring-gray-300`} onClick={() => setClick(!click)}>{user.value.name.slice(0, 1)}</p>
              }
              <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                {isOpen ? <X size={34} /> : <Menu size={34} />}
              </button>
            </div>
            {user &&
              <div className={`absolute top-15 right-10 z-100 bg-white border border-gray-300 rounded-md w-[150px]  ${click ? "block" : "hidden"}  `}>
                <ul className="flex flex-col font-normal">
                  <li className="p-2 text-violet-700 font-semibold">{user.value.name}</li>
                  <li className="flex items-center gap-2 hover:bg-gray-100 hover:cursor-pointer p-2" onClick={() => { setEdit(true); setClick(false) }}>Edit<FaRegEdit size={18} className="mb-1" /></li>
                  {showDraft && <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setDraftOpen(true); setClick(true) }}>Drafts</li>}
                  <li className="text-red-500 font-semibold hover:bg-red-500 hover:text-white hover:cursor-pointer p-2 flex items-center gap-2" onClick={() => setConfirm(true)}>Logout<IoIosLogOut size={20} /></li>
                </ul>
              </div>
            }
            {edit && <EditUser open={edit} setOpen={setEdit} />}
            {confirm && <LogoutConfirm logout={logout} setClick={setClick} setConfirm={setConfirm} />}
          </div>

          {draftOpen && <SavedDrafts open={setDraftOpen} />}
        </div>
      </div>

      <div className="md:hidden absolute top-18 left-0 w-full z-50">
        <ul className={`flex flex-col gap-4 bg-white text-right px-5 py-5 shadow-xl ${isOpen ? "opacity-100 scale-100 translate-y-0 transition-all duration-500 block" : "opacity-0 hidden -translate-y-15 transition-all duration-200"}`}>
          <li>
            <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => `hover:text-gray-400 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/image-editor" onClick={() => setIsOpen(false)} className={({ isActive }) => `hover:text-gray-400 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
              Image editor
            </NavLink>
          </li>
          <li>
            <NavLink to="/bg-remover" onClick={() => setIsOpen(false)} className={({ isActive }) => `hover:text-gray-400 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
              BG remover
            </NavLink>
          </li>
          <li>
            <NavLink to="pdf-maker" onClick={() => setIsOpen(false)} className={({ isActive }) => `hover:text-gray-400 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
              PDF maker
            </NavLink>
          </li>
          <li>
            <NavLink to="/text-to-image" onClick={() => setIsOpen(false)} className={({ isActive }) => `hover:text-gray-400 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
              Generate Image
            </NavLink>
          </li>
          <li>
            <NavLink to="/image-compressor" onClick={() => setIsOpen(false)} className={({ isActive }) => `hover:text-gray-400 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
              Image compressor
            </NavLink>
          </li>
          <li>
            <NavLink to="/image-convertor" onClick={() => setIsOpen(false)} className={({ isActive }) => `hover:text-gray-400 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
              Image convertor
            </NavLink>
          </li>
          <li>
            <NavLink to="/image-detector" onClick={() => setIsOpen(false)} className={({ isActive }) => `hover:text-gray-400 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
              Image Reader
            </NavLink>
          </li>
          <li>
            <NavLink to="/image-enhancer" onClick={() => setIsOpen(false)} className={({ isActive }) => `hover:text-gray-400 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
              Image enhancer
            </NavLink>
          </li>
          {!user && (
            <li>
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="bg-blue-500 px-4 py-2 rounded-lg w-full text-white text-center hover:bg-blue-600 block"
              >
                Login
              </NavLink>
            </li>
          )}
          {user &&
            <li>
              <NavLink
                onClick={() => setConfirm(true)}
                className="bg-rose-500 px-4 py-2 rounded-lg w-full text-white text-center hover:bg-blue-600 block"
              >
                Logout
              </NavLink>
            </li>
          }
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
