import { createContext, useEffect, useState } from "react";
export const userContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState("")
  const [url, serUrl] = useState("http://localhost:8080");
  const [drafts, setDrafts] = useState({});

  const download = async () => {
    if (user) {
      try {

        console.log(user.value.name);
        console.log(user.value.email);
        const result = await fetch(`${url}/download/download?email=${user.value.email}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${user.value.token}` }
        });
        console.log("download executed")
        return result;
      } catch (error) {
        console.log("error", error);
        alert("Something went wrong")
      }
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      const data = JSON.parse(storedUser)
      if (data.expiry > Date.now()) { setUser(JSON.parse(storedUser)) }
    }
  }, [])

  const login = (userData) => {
    const now = new Date();
    const setData = { value: userData, expiry: now.getTime() + 6 * 60 * 60 * 1000 }
    localStorage.setItem("User", JSON.stringify(setData));
    setUser(setData);
  }

  const logout = (setClick, setConfirm) => {
    setClick(false);
    setConfirm(false);
    localStorage.removeItem("User");
    localStorage.removeItem("pendingImage");
    setUser("");
  }

  return (
    <userContext.Provider value={{ user, setUser, login, logout, url, download, drafts, setDrafts }}>
      {children}
    </userContext.Provider>
  )
}

export default ContextProvider;
