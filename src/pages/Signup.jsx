import React, { useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import "../App.css"
import { NavLink } from "react-router-dom";

const Signup = () => {

  const [hide,setHide] = useState(true);

  const [data,setData] = useState({
    username: "",
    number: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const {name,value} = e.target;

    if (name === "number" && !/^\d*$/.test(value)) {
    return;}

    setData((prev)=>({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="h-[92vh] flex items-center justify-center p-4 ">
      <div className="bg-white rounded-lg overflow-hidden h-full w-full flex flex-col md:flex-row justify-center items-center gap-30">
        <div className="w-full md:w-1/3">
          <img
            src="/img/signup.png"
            className="w-full h-full object-contain mt-10 hidden md:block overflow-hidden"
          />
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full md:w-1/3 p-4 flex flex-col justify-center mb-40 md:mt-30">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-15 md:mb-6">Create Account</h2>

          <form className="space-y-6">
            <div>
              <input
                type="text"
                onChange={handleChange}
                name="name"
                value={data.name}
                placeholder="User name"
                className="w-full py-2 px-1 border-b outline-none focus:border-blue-600 capitalize"
              />
            </div>

            <div>
              <input
                type="tel"
                maxLength={10}
                name="number"
                onChange={handleChange}
                value={data.number}
                placeholder="Mobile number"
                className="w-full py-2 px-1 border-b outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={data.email}
                placeholder="Email"
                className="w-full py-2 px-1 border-b outline-none focus:border-blue-600"
              />
            </div>

            <div className="relative">
              <input
                type={hide ? "password" : "text"}
                name="password"
                onChange={handleChange}
                value={data.password}
                placeholder="Password"
                className="w-full py-2 px-1 border-b outline-none focus:border-blue-600"
                />
                { hide && <LuEye size={22} onClick={()=>setHide(pre=>!pre)} className="absolute right-2 top-3 hover:cursor-pointer"/> }
                {!hide && <LuEyeOff size={22} onClick={()=>setHide(pre=>!pre)} className="absolute right-2 top-3 hover:cursor-pointer"/> }
            </div>

            <div className="relative">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 hover:cursor-pointer hover:ring-blue-200 ring-5 rounded-lg transition"
              >
              Sign Up
            </button>
            <p className="absolute right-2 top-14 text-sm">Already have account ? <NavLink to="/login" className="text-blue-800 underline">Login</NavLink></p>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
