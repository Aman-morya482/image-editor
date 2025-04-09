import { createContext, useState } from "react";

export const userContext = createContext();

const ContextProvider = ({children}) => {
   const [userValue, setUserValue] = useState({})

    return (
    <userContext.Provider value={{userValue,setUserValue}}>
        {children}
    </userContext.Provider>
  )
}

export default ContextProvider;
