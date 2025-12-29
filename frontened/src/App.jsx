import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Home from "./components/Home";
import MainLayout from "./components/MainLayout.jsx";
import Jobs from "./components/Jobs.jsx";
import Browse from "./components/Browse.jsx";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/Jobs", element: <Jobs /> },
        { path: "/Browse", element: <Browse /> },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
