import { NavLink } from "react-router-dom";
import { MdOutlineDraw, MdOutlineImageSearch } from "react-icons/md";
import { TbBackground } from "react-icons/tb";
import { PiFilePdfLight } from "react-icons/pi";
import { RiImageAiLine, RiAiGenerate2 } from "react-icons/ri";
import { FaCompress } from "react-icons/fa";

const tools = [
  { path: "image-editor", text: "Image Editor", icon: <MdOutlineDraw size={40} /> },
  { path: "bg-remover", text: "BG Remover", icon: <TbBackground size={40} /> },
  { path: "pdf-maker", text: "PDF Maker", icon: <PiFilePdfLight size={40} /> },
  { path: "image-enhancer", text: "Image Enhancer", icon: <RiImageAiLine size={40} /> },
  { path: "text-to-image", text: "Image Generator", icon: <RiAiGenerate2 size={40} /> },
  { path: "image-convertor", text: "Format Convertor", icon: <RiImageAiLine size={40} /> },
  { path: "image-compressor", text: "Image Compressor", icon: <FaCompress size={36} /> },
  { path: "image-detector", text: "Image Analyzer", icon: <MdOutlineImageSearch size={40} /> },
];

const QuickLinks = () => {
  return (
    <div>
      <p className='mb-10 font-bold text-4xl'>Quick Links</p>
      <div className='flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 md:gap-8'>
        {tools.map((tool, index) => (
          <NavLink key={index} to={tool.path}>
            <div className='quick w-[300px] md:w-xs h-auto active:scale-95 p-3 px-4 md:p-5 border border-gray-300 bg-white/10 hover:bg-white/20 rounded-md hover:cursor-pointer group flex justify-between items-center'>
              <span className={`${tool.text == "Image Compressor" ? "group-hover:scale-90" : "group-hover:scale-110"} transition-all duration-100 ease-linear`}>{tool.icon}</span>
              <p>{tool.text}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
