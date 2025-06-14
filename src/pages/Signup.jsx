import React, { useContext, useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "../App.css"
import { NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../utils/ContextProvider";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [hide, setHide] = useState(true);
  const [result, setResult] = useState(false);
  const { url } = useContext(userContext);
  const [data, setData] = useState({ userName: "", email: "", password: "" })
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => { navigate("/login") }, 1000);
      return () => clearTimeout(timer);
    }
  }, [result])

  const handleSubmit = async (e) => {
    console.log(data);
    e.preventDefault();
    if (data.userName === '') {
      toast.info("Enter userName.");
      return;
    };
    if (data.password.length < 6) {
      toast.info("Password too short.");
      return;
    }
    console.log("signupReq: ", data);
    setLoading(true);

    try {
      const response = await fetch(`${url}/signup/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Signup Failed' + response.err);
      const data2 = await response.json();
      console.log("signupRes: ", data2);
      data2 && setResult(true);
      data2 && toast.success("Signup Successfull !!")
      !data2 && toast.error("User Already Exists !!")
    } catch (err) {
      console.error('Error:', err);
      toast.error("Something went wrong !!");
    } finally { setLoading(false) }
  };

  return (
    <div className="h-[92vh] flex items-center justify-center p-4 ">
      <div className="bg-white rounded-lg overflow-hidden h-full w-full flex flex-col md:flex-row justify-center items-center gap-30">
        <div className="w-full md:w-1/3">
          <img src="/img/signup.png" className="w-full h-full object-contain mt-10 hidden md:block overflow-hidden" />
        </div>
        <div className="w-full md:w-1/3 p-4 flex flex-col justify-center mb-40 md:mt-30">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-15 md:mb-6">Create Account</h2>
          <form className="space-y-6" onSubmit={(e) => handleSubmit(e)} >
            <div>
              <input type="text" onChange={handleChange} name="userName" value={data.userName} placeholder="User name" className="w-full py-2 px-1 border-b outline-none focus:border-blue-600 capitalize" />
            </div>
            <div>
              <input type="email" name="email" onChange={handleChange} value={data.email} placeholder="Email" className="w-full py-2 px-1 border-b outline-none focus:border-blue-600" />
            </div>
            <div className="relative">
              <input type={hide ? "password" : "text"} name="password" onChange={handleChange} value={data.password} placeholder="Password" className="w-full py-2 px-1 border-b outline-none focus:border-blue-600" />
              {hide && <LuEye size={22} onClick={() => setHide(pre => !pre)} className="absolute right-2 top-3 hover:cursor-pointer" />}
              {!hide && <LuEyeOff size={22} onClick={() => setHide(pre => !pre)} className="absolute right-2 top-3 hover:cursor-pointer" />}
            </div>
            <div className="relative">
              <button type="submit" className="w-full bg-blue-600 text-white p-3 flex justify-center hover:cursor-pointer hover:ring-blue-200 ring-5 rounded-lg transition">
                {!loading ? "Sign up" : <AiOutlineLoading3Quarters size={22} className="rotate-icon" />}
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
