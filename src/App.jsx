import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import ImageEditor from "./pages/ImageEditor";
import Home from "./pages/Home";
import AppLayout from "./components/AppLayout";
import BgRemover from "./pages/BG-remover";
import PdfMaker from "./pages/PDF-maker";
import TextToImage from "./pages/TextToImage";
import ImageCompressor from "./pages/ImageCompressor";
import ImageConvertor from "./pages/ImageConvertor";
import Signup from "./pages/Signup";
import Editor from "./pages/Editor";
import Login from "./pages/Login";
import ImageDetector from "./pages/ImageDetector";
import ImageEnhancer from "./pages/ImageEnhancer";
import EditUser from "./components/EditUser";
import { ToastContainer, toast, Slide, Bounce, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        transition={Zoom}
      />
      <Routes>
        {/* Routes inside AppLayout (with Navbar/Footer) */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/bg-remover" element={<BgRemover />} />
          <Route path="/pdf-maker" element={<PdfMaker />} />
          <Route path="/text-to-image" element={<TextToImage />} />
          <Route path="/image-compressor" element={<ImageCompressor />} />
          <Route path="/image-convertor" element={<ImageConvertor />} />
          <Route path="/image-detector" element={<ImageDetector />} />
          <Route path="/image-enhancer" element={<ImageEnhancer />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/image-editor" element={<Editor />} />
          <Route path="/edit-image" element={<ImageEditor />} />
          <Route path="/edit-user" element={<EditUser />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
