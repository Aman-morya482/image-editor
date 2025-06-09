import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { userContext } from '../utils/ContextProvider';
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from 'react-toastify';

const SavedDrafts = ({ open, setImage, sideMenu }) => {
  const { drafts, setDrafts, user, url } = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [select, setSelect] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) { document.body.style.overflow = "hidden" }
    else { document.body.style.overflow = "auto" }
    return () => { document.body.style.overflow = "auto" }
  }, [open])

  const fetchDraft = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/draft/image?email=${user.value.email}`, {
        method: 'GET',
        headers: { "Authorization": `Bearer ${user.value.token}`, }
      })
      console.log("res", response);
      const data = await response.json();
      setDrafts(data);
    } catch (error) {
      console.log("err", error);
      toast.error("Something went wrong !!");
    } finally { setLoading(false) }
  }

  useEffect(() => {
    fetchDraft();
  }, [])

  const handleOpen = async (img, id) => {
    if (!img) return;
    if (location.pathname == "/edit-image") {
      setImage(img);
      open(false)
      if (sideMenu) { sideMenu(false) }
    } else {
      await navigate("/edit-image", { state: { newImage: img } });
      open(false)
    }
    deleteDraft(id)
  }

  const deleteDraft = async (id) => {
    try {
      const response = await fetch(`${url}/draft/delete?email=${user.value.email}&id=${id}`, {
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${user.value.token}` }
      })
      toast.success("Draft deleted successfully!!")
      fetchDraft();
      setSelect(null);
      console.log("delete res", response);
    } catch (error) { console.log("deletion erro", error) }
  }

  return (
    <div className='fixed inset-0 z-100 flex justify-center items-center bg-black/50'>
      <div className='w-[90%] max-w-xl h-[600px] bg-white rounded-xl py-4 p-8 flex flex-col justify-center gap-4 text-md md:text-xl shadow-xl'>
        <div className='w-full flex justify-between items-center'>
          <p className='md:text-3xl font-semibold text-gray-600 font-ubuntu'>Saved Drafts</p>
          <div onClick={() => deleteDraft(select)} className={`${select == null ? "text-gray-400 cursor-not-allowed" : "text-red-600 cursor-pointer"}`} disabled={select == null}><AiOutlineDelete size={30} /></div>
        </div>
        <div className='border border-gray-400 rounded-md h-[400px] w-full flex flex-col items-center gap-5 overflow-y-auto p-5'>
          {loading && <p className='text-center text-gray-700 text-2xl'>Fetching draft images...</p>}
          {!loading && (Object.keys(drafts).length <= 0) && (<p>No Draft</p>)}
          <ul className='grid grid-cols-2 gap-5'>
            {!loading && (Object.keys(drafts).length > 0) && Object.entries(drafts).map(([id, image], ind) => (
              <li key={id} onClick={() => setSelect((pre) => (pre === id ? null : id))} className={`border cursor-pointer border-gray-400 ${select === id ? "ring-2 ring-purple-500" : ""} bg-gray-200 p-2 rounded-md`}>
                <img src={image} alt={`draft ${id}`} className="h-[200px] w-[300px] object-cover" />
              </li>
            ))}
          </ul>
        </div>
        <div className='flex gap-3 justify-end text-lg'>
          <button className='border-2 border-gray-600 py-2 px-3 rounded-full cursor-pointer' onClick={() => { open(false); if (sideMenu) { sideMenu(false) } }}>Cancel</button>
          <button className={`rounded-full ${select == null ? "bg-gray-400" : "bg-purple-500"} text-white px-4 py-2 cursor-pointer`}
            disabled={select === null} onClick={() => { handleOpen(drafts[select], select) }}>Open</button>
        </div>
      </div>
    </div>
  )
}

export default SavedDrafts
