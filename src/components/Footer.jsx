import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-6 md:py-10 border-t-gray-300 border">
      <div className="container mx-auto px-6 md:px-2 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
        <div>
          <NavLink to='/'><img src="/img/logo.png" className="w-[100px] md:w-[200px]" alt="" /></NavLink>
        </div>

        <div className="col-span-1 md:col-span-2">
        <h3 className="text-lg font-semibold mb-3">App Tools</h3>
        <div className="grid md:grid-cols-2 grid-rows-2 gap-2">
          <ul className="space-y-2">
            <li><NavLink to='edit-image' className="text-gray-600 hover:text-blue-700 hover:underline">Image Editor</NavLink></li>
            <li><NavLink to='image-enhancer' href="#" className="text-gray-700 hover:text-blue-700 hover:underline">Image Enhancer</NavLink></li>
            <li><NavLink to='image-convertor' className="text-gray-600 hover:text-blue-700 hover:underline">Format Convertor</NavLink></li>
            <li><NavLink to='image-compressor' className="text-gray-700 hover:text-blue-700 hover:underline">Image Compressor</NavLink></li>
          </ul>
          <ul className="space-y-2">
            <li><NavLink to='pdf-maker' className="text-gray-700 hover:text-blue-700 hover:underline">PDF Maker</NavLink></li>
            <li><NavLink to='bg-remover' className="text-gray-700 hover:text-blue-700 hover:underline">BG Remover</NavLink></li>
            <li><NavLink to='image-detector' className="text-gray-700 hover:text-blue-700 hover:underline">Image Analyzer</NavLink></li>
            <li><NavLink to='text-to-image' className="text-gray-700 hover:text-blue-700 hover:underline">Image Generator</NavLink></li>
          </ul>
        </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 w-full">Help & Docs </h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-700 hover:text-blue-700 hover:underline">FAQs</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-700 hover:underline">Tutorails</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-700 hover:underline">Feedback</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-700 hover:underline">Documentation</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 w-full">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-700 hover:text-blue-700 hover:underline">Support</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-700 hover:underline">About Us</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-700 hover:underline">Contact Us</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-700 hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="col-span-1 md:col-span-3 flex justify-center md:justify-start space-x-4">
          <a href="#" className="text-gray-700 hover:text-blue-700">
            <Facebook size={24} />
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-700">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-700">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-700">
            <Linkedin size={24} />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Pixelo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
