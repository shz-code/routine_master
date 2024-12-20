import { FC, ReactNode } from "react";

import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "./AppSidebar";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      {/* Sidebar */}
      <AppSidebar />

      <div className="flex flex-col flex-1">
        <Header />
        <main className="container py-4">
          <div>{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};
export default Layout;
