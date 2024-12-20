import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ setSidebarOpen }) => {
  return (
    <header className="bg-[#010231] py-2 print:hidden">
      <div className="px-2">
        <div className="logo-container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span
              onClick={() => setSidebarOpen((prev) => !prev)}
              className={`lg:hidden cursor-pointer p-2 bg-slate-700/50 rounded`}
            >
              <Menu size={30} className="text-white" />
            </span>
            <Link to="/" className="flex gap-4 items-center">
              <div className="logo img-container">
                <img
                  src="https://cse.iubat.edu/wp-content/uploads/2019/06/iubat_cse-logo.png"
                  alt="Logo"
                  className="border-2 bg-white rounded-full"
                />
              </div>
              <h2 className="text-white hidden md:block">Routine Master</h2>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
