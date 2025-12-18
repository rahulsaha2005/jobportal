// MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./shared/navbar.jsx";

function MainLayout({ User, setUser }) {
  return (
    <div>
      <Navbar User={User} setUser={setUser} />
      <Outlet /> {/* This renders the current route page */}
    </div>
  );
}

export default MainLayout;
