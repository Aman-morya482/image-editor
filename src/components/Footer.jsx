import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-6 md:py-10 border-t-gray-300 border">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div>
          <img src="/img/logo.png" className="w-[100px] md:w-[200px]" alt="" />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">App Tools</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-blue-700">BG Remover</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-700">Text-to-Image</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-700">PDF Maker</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-700">Image Compressor</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-700 hover:text-blue-700">About Us</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-700">Contact Us</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-700">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="col-span-1 md:col-span-3 flex justify-center md:justify-start space-x-4 mt-4">
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
