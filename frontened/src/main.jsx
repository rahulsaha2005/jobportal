import React from "react";
import ReactDom from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App.jsx";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <h1>
    <App />
  </h1>
);
