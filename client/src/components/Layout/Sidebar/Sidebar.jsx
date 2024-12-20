import { Menu } from "lucide-react";
import SidebarLinks from "./SidebarLinks";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains("sidebarWrapper")) {
      setSidebarOpen(false);
    }
  };

  return (
    <div
      className={`border-e fixed top-0 bg-slate-800/20 z-10 lg:relative lg:max-w-[300px] h-full lg:h-auto w-full transition-all lg:translate-x-0 sidebarWrapper ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      onClick={handleClick}
    >
      <div
        className={`bg-white w-3/4 lg:w-full h-full relative flex flex-col justify-between overflow-y-scroll sidebarContainer`}
      >
        <div className="flex items-center justify-between lg:justify-center py-8 px-4">
          {/* Toggle sidebar close */}
          {sidebarOpen && (
            <span
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="lg:hidden inline-block cursor-pointer p-2 bg-slate-800/50 rounded"
            >
              <Menu size={30} className="text-white" />
            </span>
          )}
          <div className="text-end lg:text-center max-w-[180px] cursor-pointer">
            <h2 className="break-words">Routine Master</h2>
          </div>
        </div>
        <SidebarLinks setSidebarOpen={setSidebarOpen} />
      </div>
    </div>
  );
};

export default Sidebar;
