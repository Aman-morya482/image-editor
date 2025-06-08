import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

const AppLayout = () => {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === "/edit-image";

  useEffect(()=>{
    window.scrollTo({top:0,behavior:'smooth'});
  },[location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavAndFooter && <Navbar />}
      
      <main className="flex-grow">
        <Outlet /> {/* This renders the child routes */}
      </main>
      
      {!hideNavAndFooter && <Footer />}
    </div>
  );
};

export default AppLayout;
