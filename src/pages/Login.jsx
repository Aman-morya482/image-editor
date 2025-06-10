import { useState, useEffect, useContext } from "react";
import { userContext } from "../utils/ContextProvider";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "../App.css"
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [hide, setHide] = useState(true);
  const { user, login, url, download } = useContext(userContext);
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    console.log(data);
    e.preventDefault();
    if (data.email == "") { return toast.info("Enter Email Address") }
    if (data.password == "") { return toast.info("Enter Password") }
    setLoading(true);
    console.log("LoginReq: ", data);

    try {
      const response = await fetch(`${url}/login/get-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Conversion failed' + response.err);
      const data2 = await response.json();
      console.log("LoginRes:", data2)
      if (!data2) return toast.error("Invalid Email or Password !!")
      data2 && toast.success("Login Successfull!!")
      login(data2);
      setData({ email: "", password: "" })
      navigate("/")
    } catch (err) {
      console.error('Error:', err);
      toast.error("Something went wrong!!");
    } finally { setLoading(false) }
  };

  const handleImageDownload = (pending) => {
    if (pending) {
      const imgurl = `data:image/${pending.format};base64,${pending.image}`
      const link = document.createElement("a");
      link.href = imgurl;
      link.download = `${pending.name}.${pending.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      localStorage.removeItem("pendingImage");
    }
  }

  const handlepdfDownload = (pending) => {
    const a = document.createElement('a');
    a.href = pending.pdf;
    a.download = 'Pixelo-pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    localStorage.removeItem("pendingPdf")
  }

  useEffect(() => {
    const pendingImage = JSON.parse(localStorage.getItem("pendingImage"));
    const pendingPdf = JSON.parse(localStorage.getItem("pendingPdf"));
    if (pendingImage && user) { handleImageDownload(pendingImage) }
    if (pendingPdf && user) { handlepdfDownload(pendingPdf) }
  }, [user])

  return (
    <div className="h-[92vh] flex items-center justify-center p-4 ">
      <div className="bg-white rounded-lg overflow-hidden h-full w-full flex flex-col md:flex-row justify-center items-center gap-30">
        <div className="w-full md:w-1/3">
          <img src="/img/login.jpg" className="w-full h-full object-contain mt-10 hidden md:block overflow-hidden" />
        </div>
        <div className="w-full md:w-1/3 p-4 flex flex-col justify-center mb-40 md:mt-30">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-15 md:mb-6">Login</h2>
          <form className="space-y-6" onSubmit={(e) => { handleSubmit(e) }}>
            <div>
              <input type="email" name="email" onChange={handleChange} value={data.email} placeholder="Email" className="w-full py-2 px-1 border-b outline-none focus:border-blue-600" />
            </div>
            <div className="relative">
              <input type={hide ? "password" : "text"} name="password" onChange={handleChange} value={data.password} placeholder="Password" className="w-full py-2 px-1 border-b outline-none focus:border-blue-600" />
              {hide && <LuEye size={22} onClick={() => setHide(pre => !pre)} className="absolute right-2 top-3 hover:cursor-pointer" />}
              {!hide && <LuEyeOff size={22} onClick={() => setHide(pre => !pre)} className="absolute right-2 top-3 hover:cursor-pointer" />}
            </div>
            <div className="relative">
              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-3 hover:cursor-pointer hover:ring-blue-200 ring-5 flex justify-center rounded-lg transition">
                {!loading ? "Login" : <AiOutlineLoading3Quarters size={22} className="rotate-icon" />}
              </button>
              <p className="absolute right-2 top-14 text-sm">Not have account ? <NavLink to="/signup" className="text-blue-800 underline">Sign up</NavLink></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
