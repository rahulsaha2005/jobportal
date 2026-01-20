import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./shared/navbar.jsx";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
