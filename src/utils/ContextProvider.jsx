import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

const ContextProvider = ({children}) => {
   const [user, setUser] = useState("")

   const [url,serUrl] = useState("http://localhost:8080");

   useDownload(async()=>{
    user = localStorage.getItem("User");
    console.log(user);
    const result = await fetch(`url/get/download?token=${user.value.email}`,{
      method:'POST',
      header:{Authorization : `Baarer+user.value.token`}
    })
   },[])

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
    <userContext.Provider value={{user,setUser,login,logout,url}}>
        {children}
    </userContext.Provider>
  )
}

export default ContextProvider;
