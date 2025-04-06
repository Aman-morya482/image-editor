import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs =[
  {
    question: "What is Pixelo?",
    answer: "Pixelo is an advanced online image editing platform designed for both beginners and professionals. It provides a seamless, user-friendly experience with tools such as photo editing, background removal, PDF creation, Image compressor ,some AI-powered tools and more. Whether you're a photographer, designer, or social media creator, Pixelo makes image editing easy and efficient, directly from your browser without the need for software installation."
  },
  {
    question: "Is Pixelo safe to use?",
    answer: "Absolutely! Pixelo is built with user security and privacy in mind. We do not store or use your images without consent. All image processing happens securely in real-time, and we use encrypted connections to keep your data safe. Additionally, we do not require unnecessary personal information, ensuring a safe and private editing experience for all users."
  },
  {
  question: "What AI tools does Pixelo offer?",
  answer: "Pixelo integrates advanced AI technology to simplify and enhance your image editing experience. Currently, we offer two AI-powered tools: 1>AI Image Generator: Transforms text descriptions into visually stunning AI-generated images. This tool is perfect for artists, designers, and content creators looking to generate unique visuals effortlessly. 2>AI Image Analyzer: Uses AI to analyze images and provide detailed descriptions, identifying key elements within the image. This is useful for accessibility, content tagging, and understanding image composition."
  },
  {
    question: "Can I use Pixelo on different devices?",
    answer: "Yes! Pixelo is a fully web-based platform, making it accessible from any device, including desktops, laptops, tablets, and smartphones. Since it does not require downloads or installations, you can seamlessly switch between devices while working on your projects. Your work remains accessible as long as you are logged into your Pixelo account."
  },
  {
    question: "What is the difference between Photoshop and Pixelo?",
    answer: "While both Photoshop and Pixelo are powerful image editing tools, there are key differences: 1> Accessibility: Pixelo is web-based, meaning you can use it instantly without installation, while Photoshop requires downloading and installing software. 2> Ease of Use: Pixelo is designed for simplicity, making editing accessible for beginners, whereas Photoshop has a steeper learning curve and is geared towards professional designers. 3>Pricing: Pixelo provides a free version with essential tools, whereas Photoshop requires a paid subscription. For quick and efficient edits, Pixelo is a great choice. For more advanced manual editing, Photoshop might be preferred."
  },
  {
    question: "How can I get started with Pixelo?",
    answer: "Getting started with Pixelo is simple: 1>Open your browser and go to Pixelo’s homepage. 2>Select any tool, you want to use like photo editig, image generation, or background removal instantly. 3> Create an account to save images and access them from any device. 4>Once you're done editing, download your image in your preferred format. No installation is required, making Pixelo the perfect choice for fast and efficient image editing."
  },
  {
    question: "Can I use Pixelo without signing up?",
    answer: "Yes, you can start using Pixelo without creating an account. Many basic tools are available for immediate use. However, signing up allows you to access additional features such as downloading, saving draft. For professional users, having an account ensures that your work is saved and can be accessed from any device."
  },

];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-[1800px] bg-gradient-to-br from-orange-300 to-orange-600 text-white p-10 md:py-16 md:px-6">
      <div className="w-full mx-auto text-center">
        <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs md:text-sm  font-semibold uppercase">
          Frequently Asked
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3">Do You Have a Question?</h2>
      </div>

      <div className="max-w-4xl mx-auto mt-8">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-white/40">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left text-lg font-semibold py-4"
            >
              {faq.question}
              {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {openIndex === index && (
              <p className="text-white/90 text-sm md:text-base pb-4 tracking-wide px-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
