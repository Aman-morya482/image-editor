import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import PdfPreview from "../components/PdfPreview";


const PDFmaker = () => {
  const [images, setImages] = useState([]); // Store selected images
  const [pdf,setPdf] = useState([]);

  const handleRemoveImage = (index) => {
  setImages((prevImages) => prevImages.filter((_, i) => i !== index));
};

const handleBack = () =>{
  setImages([]);
}

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };


    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

useEffect(()=>{
    console.log(pdf)
    },[pdf])

   const sendToBackend = async () => {
      try {
               const base64Images = await Promise.all(
                  images.map((img) => convertToBase64(img))
                );

                const imagePayload = {
                  images : base64Images,
                };

        const response = await fetch('http://localhost:8080/pdf/make-pdf', {
          method: 'POST',
              headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( imagePayload ),
        });
    console.log(JSON.stringify(imagePayload ))


        if (!response.ok) throw new Error('Conversion failed');
        const data = await response.blob();
        const url = await URL.createObjectURL(data)
        setPdf(url);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'converted.pdf'; // You can customize the file name here
          document.body.appendChild(a);
          a.click();

          // Cleanup
          a.remove();
          URL.revokeObjectURL(url);

      } catch (err) {
        console.error('Error:', err);

        alert("failed");
      }
    };



  return (
    <div className="grid grid-cols-1 place-items-center">

    <div className="max-w-[1800px] w-full min-h-[92vh] flex justify-centerce items-center bg-gray-100">
    
    
    {images.length <= 0 && (
      <div className="w-full flex flex-col justify-center items-center">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-20">Convert Image to PDF</h2>
      <div className="relative group">
      <p className='bg-blue-600 w-xs md:w-2xl text-white md:font-bold group-active:scale-95 hover:cursor-pointer ring-blue-300 hover:ring-2 text-lg md:text-xl rounded-2xl p-5 text-center'>Upload Image </p>
      <input type="file" name="" id="" multiple accept="image/*" onChange={handleImageChange} className='absolute top-10 md:-top-0 bg-red-600 opacity-0 w-xs md:w-2xl text-white text-xl rounded-2xl p-2 md:p-5 text-center'/>
      </div>
    </div>
    )}
    
    {images.length >0 && (
      <div className="w-full flex flex-col justify-center items-center"> 
        <PdfPreview images={images} download={sendToBackend} remove={handleRemoveImage} back={handleBack}/>
      </div>    
    )}
    
    </div>
      
    </div>
  );
};

export default PDFmaker;




// import React, { useState } from "react";
// import { jsPDF } from "jspdf";

// const PdfMaker = () => {
//   const [images, setImages] = useState([]);

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImages(files);
//   };

//   const generatePDF = async () => {
//     if (!images.length) return;

//     const pdf = new jsPDF({unit:"pt"});

//     for (let i = 0; i < images.length; i++) {
//       const img = images[i];
//       const reader = new FileReader();

//       const dataUrl = await new Promise((resolve) => {
//         reader.onload = () => resolve(reader.result);
//         reader.readAsDataURL(img);
//       });

//       const imgProps = pdf.getImageProperties(dataUrl);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       if (i !== 0) pdf.addPage();
//       pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, pdfHeight);
//     }

//     pdf.save("generated.pdf");
//   };

//   return (
//     <div>
//       <h2>Upload Multiple Images</h2>
//       <input
//         type="file"
//         accept="image/*"
//         multiple
//         onChange={handleImageChange}
//       />
//       <button onClick={generatePDF} disabled={!images.length}>
//         Create PDF
//       </button>       
//         {images.length > 0 && (
//            <div className="mt-4 grid grid-cols-3 gap-2">
//            {images.map((image, index) => (
//                <img
//                  key={index}
//                  src={URL.createObjectURL(image)}
//                  alt={`Selected ${index + 1}`}
//                  className="w-24 h-24 object-cover rounded"
//                  onClick={()=>handleRemoveImage(index)}
//                  />
//                  ))}
//                  </div>
//                )}
//     </div>
//   );
// };

// export default PdfMaker;
