import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { userContext } from '../utils/ContextProvider';
import { toast } from 'react-toastify';

const DraftConfirm = ({ cancel, image }) => {
  const { user, url } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) { document.body.style.overflow = "hidden" }
    else { document.body.style.overflow = "auto" }
    return () => { document.body.style.overflow = "auto" }
  }, [open])

  const handleDiscard = () => {
    localStorage.removeItem("uploadedImage");
    navigate("/image-editor");
  }

  const saveDraft = async (image) => {
    toast.info("Saving Your Draft...");
    try {
      const response = await fetch(`${url}/draft/save?email=${user.value.email}`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${user.value.token}`,
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({ image: image }),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get the text sent from backend
        if (response.status === 500) {
          toast.error("Draft Limit Reached");
          console.log("error", errorText)
        } else {
          toast.error("Draft not saved: " + errorText);
        }
        return;
      }

      toast.success("Draft saved successfully!!");
    } catch (error) {
      console.error("Network or JS Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className='absolute left-0 top-0 z-100 w-full h-screen bg-black/40 flex justify-center items-center font-normal'>
      <div className='relative py-10 px-6 flex flex-col justify-start w-[350px] h-[220px] bg-white border shadow-2xl rounded-md'>
        <p onClick={() => cancel(false)} className='absolute right-2 top-1 text-2xl px-2 py-2 hover:bg-gray-200 cursor-pointer rounded-[50%]'><RxCross2 /></p>
        <p className='text-2xl font-semibold'>Discard Editing? </p>
        <p className='text-sm mt-2'>Are you sure you want to discard editing?</p>
        <div className='w-full flex justify-center items-center gap-4 mt-10'>
          <button onClick={() => saveDraft(image)} className='bg-blue-500 text-white py-2 px-3 rounded-md hover:cursor-pointer ring-blue-300 hover:ring-3'>Save Draft</button>
          <button onClick={() => handleDiscard()} className='bg-red-500 text-white py-2 px-3 rounded-md hover:cursor-pointer ring-red-300 hover:ring-3'>Discard</button>
        </div>
      </div>
    </div>
  )
}

export default DraftConfirm
