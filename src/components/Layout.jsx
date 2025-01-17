import React from "react";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="h-full w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
