import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from "../src/components/ui/sonner.jsx";
import React from "react";
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
);
