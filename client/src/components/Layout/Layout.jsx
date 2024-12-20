import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar/Sidebar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col justify-between min-h-dvh">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex gap-4 flex-grow">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="w-full">{children}</div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
