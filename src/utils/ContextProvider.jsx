import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

const ContextProvider = ({children}) => {
   const [user, setUser] = useState("")

   const [url,serUrl] = useState("http://localhost:8080");

   const download = async()=>{
    setUser(localStorage.getItem("User"));
    console.log(user);
    if (user) {
      console.log(user.value.name);
      console.log(user.value.email);
      const result = await fetch(`url/get/download?email=${user.value.email}`, {
        method: 'POST',
        headers: {Authorization: `Bearer ${user.value.token}`}
      });
   }
  }

   useEffect(()=>{
    const storedUser = localStorage.getItem("User");
    if (storedUser) setUser(JSON.parse(storedUser));
   },[])
    
   const login = (userData)=>{
      const now = new Date();
      const setData = {value:userData,expiry:now.getTime()+6*60*60*1000}
      localStorage.setItem("User",JSON.stringify(setData));
      setUser(setData);
    }
    
    const logout = (setClick,setConfirm)=>{
      setClick(false);
      setConfirm(false);
      localStorage.removeItem("User");
      localStorage.removeItem("pendingImage");
      setUser("");
   }

    return (
    <userContext.Provider value={{user,setUser,login,logout,url,download}}>
        {children}
    </userContext.Provider>
  )
}

export default ContextProvider;
