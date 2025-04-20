import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

const ContextProvider = ({children}) => {
   const [user, setUser] = useState("")

   useEffect(()=>{
    const storedUser = localStorage.getItem("User");
    if (storedUser) setUser(JSON.parse(storedUser));
   },[])
    
    const login = (userData)=>{
      localStorage.setItem("User",JSON.stringify(userData));
      setUser(userData);
    }
    
    const logout = (setClick,setConfirm)=>{
      setClick(false);
      setConfirm(false);
      localStorage.removeItem("User");
      localStorage.removeItem("pendingImage");
      setUser("");
   }

    return (
    <userContext.Provider value={{user,setUser,login,logout}}>
        {children}
    </userContext.Provider>
  )
}

export default ContextProvider;
