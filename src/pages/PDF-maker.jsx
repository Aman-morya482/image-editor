import { useContext, useEffect, useRef, useState } from "react";
import PdfPreview from "../components/PdfImagePreview";
import { userContext } from "../utils/ContextProvider";
import gsap from "gsap";

const PDFmaker = () => {
  const [images, setImages] = useState([]);
  const [pdf, setPdf] = useState(null);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const pdfRef = useRef(null);
  const { user } = useContext(userContext);

  useEffect(() => {
    gsap.fromTo(pdfRef.current, { y: "15%", opacity: 0 }, {
      y: "0%",
      opacity: 1,
      duration: 1,
      ease: "power1.inOut"
    });
  }, [])

  const handleRemoveImage = (index) => { setImages((prevImages) => prevImages.filter((_, i) => i !== index)); };
  const handleImageChange = (e) => { const files = Array.from(e.target.files); setImages(files) };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const sendToBackend = async () => {
    setLoading(true);

    try {
      const base64Images = await Promise.all(
        images.map((img) => convertToBase64(img))
      );
      const imagePayload = { images: base64Images };

      const response = await fetch(`${url}/pdf/make-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imagePayload),
      });
      const data = await response.blob();
      const url = URL.createObjectURL(data);
      setTimeout(() => { setPdf(url) }, 2000);
    } catch (err) {
      console.error('Error:', err);
      alert("failed to convert");
    } finally { setLoading(false) }
  };

  const downloadPdf = () => {
    !user && setLogin(true);
    if (!user) return pendingPdf(pdf);
    const a = document.createElement('a');
    a.href = pdf;
    a.download = 'Pixelo-pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const pendingPdf = (url) => {
    const item = { pdf: url, expiry: 86400000 }
    localStorage.setItem("pendingPdf", JSON.stringify(item))
  }

  const cancelLogin = () => { setLogin(false); }

  return (
    <div className="grid grid-cols-1 place-items-center ">
      <div className="max-w-[1800px] w-full min-h-[92vh] bg-yellow-100 flex justify-centerce items-center">
        {images.length <= 0 && (
          <div className="relative w-full flex flex-col justify-center items-center">
            <span className='hidden xl:block'><img src="/png/011-pdf.png" alt="" width={100} className='absolute -top-25 right-40 float-svg' /></span>
            <span className='hidden xl:block'><img src="/png/007-image-file.png" alt="" width={100} className='absolute -bottom-10 left-50 scale-svg' /></span>
            <h2 ref={pdfRef} className="text-4xl md:text-7xl font-bold text-center mb-4">Convert Images to PDF</h2>
            <h4 className="mb-8 text-amber-600 font-semibold text-lg text-center">Upload your images and instantly generate high-quality PDFs.</h4>
            <div className="relative group">
              <p className='bg-amber-500 tracking-wider w-xs md:w-3xl text-white md:font-bold group-active:scale-95  ring-yellow-400 group-hover:ring-4 text-lg md:text-xl rounded-full p-5 text-center '>Upload Image</p>
              <input type="file" name="" id="" multiple accept="image/*" onChange={handleImageChange} className='absolute top-10 md:-top-0 cursor-pointer bg-red-600 opacity-0 w-xs md:w-3xl text-white text-xl rounded-2xl p-2 md:p-5 text-center' />
            </div>
            <h1 className='font-semibold text-xl md:text-3xl text-gray-600 mt-6'>-- How it Works -- </h1>
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 list-none uppercase font-semibold text-lg text-gray-700 mt-5">
              <li>📩 Upload Images ➡</li>
              <li>🔁 Convert ➡</li>
              <li>✅ Download PDF</li>
            </div>
          </div>
        )}
        {images.length > 0 && (
          <div className="w-full flex flex-col justify-center items-center">
            <PdfPreview images={images} setImages={setImages} login={login} pdf={pdf} loading={loading} setPdf={setPdf} cancelLogin={cancelLogin} createPdf={sendToBackend} downloadPdf={downloadPdf} remove={handleRemoveImage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFmaker;

