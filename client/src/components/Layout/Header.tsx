import { SidebarTrigger } from "../ui/sidebar";

const Header = () => {
  return (
    <header className="bg-white border-b z-10">
      <div className="container py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <SidebarTrigger />
      </div>
    </header>
  );
};
export default Header;
