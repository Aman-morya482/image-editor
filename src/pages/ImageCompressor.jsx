import { useState } from "react";

const ImageCompressor = () => {
  const [base64Image, setBase64Image] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base69result = (reader.result);
        setBase64Image(base69result);
        console.log("base69 image", base69result);
      };
    }
  };

  const handleUpload = async () => {
    if (!base64Image) {
      alert("Please select an image first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      });

      const result = await response.json();
      console.log("Server Response:", result);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
    <div className="h-screen justify-center flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4 p-2 border border-gray-300 rounded"
        />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
        Upload Image
      </button>
    </div>
    </div>
  );
};

export default ImageCompressor;
