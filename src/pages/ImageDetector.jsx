import React, { useContext, useState } from 'react';
import axios from 'axios';
import FirstLogin from '../components/FirstLogin';
import { userContext } from '../utils/ContextProvider';

const ImageDetector = () => {
  const [img, setImg] = useState(null);
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [login,setLogin] = useState(false);

  const {user} = useContext(userContext);

  const handleFileChange = async (e) => {
    if(!user) setLogin(true);
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await convertToBase64(file);
    setImg(base64);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };


  const sendToBackend = async () => {
    setLoading(true);
    let imageUrl;

       try {
      const formData = new URLSearchParams();
      formData.append("key", "c566d8a130fb6cc14f4fa26b568e003f");
      formData.append("image", img);
      formData.append("expiration", 300);

      const response = await axios.post("https://api.imgbb.com/1/upload", formData.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      imageUrl = response.data?.data?.url;
      setUrl(imageUrl);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed: " + error.message);
      return;
    }


    const payload = {imageData : imageUrl , message: "" };
    console.log("payload",payload)
    console.log("url",imageUrl);
    try {
      const response = await fetch("http://localhost:8080/api/imageReader", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to fetch description");

      const data = await response.json();
      console.log(data);
      setDescription(data[0]);
    } catch (err) {
      console.error(err);
      alert("Something went wrong! Try again later.");
      setImg(null);
    } finally {
      setLoading(false);
    }
  };

  const cancelLogin = ()=>{
  setLogin(false);
  setImg(null)
}

  return (
    <div className="grid grid-cols-1 place-items-center bg-gray-100 min-h-screen">
      <div className={`${!img ? "min-h-[92vh]" : "h-[50vh]"} max-w-[1800px] w-full flex justify-center items-center`}>
        <div className="w-full flex flex-col justify-center items-center px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-10"
            style={{
              background: "linear-gradient(to right, blue, purple, red)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: "1.3"
            }}>
            AI Image Description<br />Generator
          </h2>
          <div className="relative group flex justify-center">
            <label className="bg-blue-600 text-white md:font-bold w-2xs md:w-xl ring-blue-300 hover:ring-2 text-lg md:text-xl rounded-2xl py-2 md:p-5 text-center cursor-pointer">
              Upload Image
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {img && (
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex flex-col items-center gap-3 m-5">
            <img src={`data:image/jpeg;base64,${img}`} alt="Uploaded" className="w-[200px] h-[200px] rounded-md shadow object-cover" />
            <button
              onClick={sendToBackend}
              className={`bg-green-600 text-white hover:cursor-pointer ring-green-300 hover:ring-2 rounded-md py-2 px-5 text-center`}>
              {loading ? "Processing..." : "Analyze Image"}
            </button>
          </div>

          {description && !loading && (
            <div className="md:w-[60%] m-4 tracking-wider bg-white rounded shadow-xl">
              <div className="md:text-xl w-full bg-yellow-400 font-semibold p-2 text-center">Description</div>
              <p className="text-sm py-4 px-4 md:px-8">{description}</p>
            </div>
          )}
        </div>
      )}

      {login && <FirstLogin open={cancelLogin}/>}
    </div>
  );
};

export default ImageDetector;
