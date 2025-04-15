import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

const ContextProvider = ({children}) => {
   const [user, setUser] = useState()
   const [download,setDownload] = useState(false);

   useEffect(()=>{
    const storedUser = localStorage.getItem("User");
    setUser(JSON.parse(storedUser));
   },[])

   useEffect(()=>{
    user && setDownload(true);
   },[user])

   const login = (userData)=>{
    localStorage.setItem("User",JSON.stringify(userData));
    setUser(userData);
   }

   const logout = (setClick,setConfirm)=>{
    setClick(false);
    setConfirm(false);
    localStorage.removeItem("User");
    localStorage.removeItem("pendingImage");
    setUser(null);
   }

    return (
    <userContext.Provider value={{user,setUser,setUser,login,logout,download,setDownload}}>
        {children}
    </userContext.Provider>
  )
}

export default ContextProvider;
