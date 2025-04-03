import { useState } from "react";
import axios from "axios";

const PDFmaker = () => {
  const [images, setImages] = useState([]); // Store selected images
  const [pdfUrl, setPdfUrl] = useState(""); // Store processed PDF URL
  const [loading, setLoading] = useState(false);

  const handleRemoveImage = (index) => {
  setImages((prevImages) => prevImages.filter((_, i) => i !== index));
};
  // Convert images to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle image selection
  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);
    setImages(files); // Store the files for preview
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (images.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    setLoading(true);

    try {
      // Convert each image to Base64
      const base64Images = await Promise.all(
        images.map(async (image) => await convertToBase64(image))
      );

      console.log(base64Images);

      // Send Base64 images to backend
      const response = await axios.post("http://localhost:5000/api/pdf-maker", {
        images: base64Images,
      });

      setPdfUrl(response.data.pdfUrl); // Store the returned PDF URL
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-[92vh] flex justify-centerce items-center bg-gray-100">
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">PDF Maker</h2>

      {/* Image Upload Input */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="w-full bg-blue-600 p-2 rounded text-white"
      />

      {/* Preview Selected Images */}
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Selected ${index + 1}`}
              className="w-24 h-24 object-cover rounded"
              onClick={()=>handleRemoveImage(index)}
            />
          ))}
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
      >
        {loading ? "Processing..." : "Generate PDF"}
      </button>

      {/* PDF Download Link */}
      {pdfUrl && (
        <div className="mt-4 p-2 bg-green-700 rounded">
          <p className="text-sm">PDF Generated Successfully!</p>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">
            Download PDF
          </a>
        </div>
      )}
    </div>
    </div>
  );
};

export default PDFmaker;
