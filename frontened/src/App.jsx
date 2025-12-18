import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Home from "./components/Home";
import { useState } from "react";


import MainLayout from "./components/MainLayout.jsx";

function App() {
  const [User, setUser] = useState(false);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout User={User} setUser={setUser} />,
      children: [
        { path: "/", element: <Home User={User} setUser={setUser} /> },
        { path: "/login", element: <Login setUser={setUser} /> },
        { path: "/signup", element: <Signup setUser={setUser} /> },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
