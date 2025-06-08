import { useContext, useEffect, useState } from 'react'
import { userContext } from '../utils/ContextProvider'

const EditUser = ({ open, setOpen }) => {
  const { user, url } = useContext(userContext);
  const [edit, setEdit] = useState(user.value.name);

  useEffect(() => {
    if (open) { document.body.style.overflow = "hidden" }
    else { document.body.style.overflow = "auto" }
    return () => { document.body.style.overflow = "auto" }
  }, [open])

  const handleChange = async () => {
    user.value.name = edit;
    const name = edit;
    const email = user.value.email;
    console.log("email", email, 'name', name);
    try {
      const response = await fetch(`${url}/signup/getUpdate?email=${email}&name=${name}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.value.token}` }
      })
      console.log(response)
      if (response.ok) alert("Username updated successfully");
      setOpen(false);
    } catch (error) {
      console.log("err", error)
      alert("something went wrong");
    }
  }

  return (
    <div className='fixed inset-0 bg-black/50 z-100 w-full h-screen  flex justify-center items-center font-normal'>
      <div className='relative p-6 flex flex-col justify-start items-center w-[380px] h-[250px] bg-white border shadow-2xl rounded-xl'>
        <p className='text-3xl font-semibold'>Edit Profile</p>
        <div className='w-full flex flex-col justify-between items-center gap-1 mt-12'>
          <div className='text-lg'>
            <label className='font-semibold' htmlFor="">Username: </label>
            <input type="text" className='border w-[200px] py-1 px-2 rounded-md' value={edit} onChange={(e) => { setEdit(e.target.value) }} />
          </div>
          <div className='flex gap-3 mt-6'>
            <button className='bg-red-500 text-white py-2 px-3 rounded-md hover:cursor-pointer ring-red-300 hover:ring-3' onClick={() => { setOpen(false) }}>Cancel</button>
            <button className='bg-blue-500 text-white py-2 px-3 rounded-md hover:cursor-pointer ring-blue-300 hover:ring-3' onClick={() => handleChange()}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUser
