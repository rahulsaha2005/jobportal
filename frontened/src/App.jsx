import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/signup";
import Home from "./components/Home";
import MainLayout from "./components/MainLayout.jsx";
import Jobs from "./components/Jobs.jsx";
import Browse from "./components/Browse.jsx";
import Profile from "./components/profile.jsx";
import JobDescription from "./components/JobDescription.jsx";
import Companies from "./components/admin/Companies.jsx";
import Adminjobs from "./components/admin/AdminJobs.jsx";
import AdminRegisterCompany from "./components/admin/AdminRegisterCompany.jsx";
import AdminUpdateCompany from "./components/admin/AdminUpdateCompany.jsx";
import AdminCompanyDescription from "./components/admin/AdminCompanyDescription.jsx";

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
        { path: "/profile", element: <Profile /> },
        { path: "/description/:id", element: <JobDescription /> },
        { path: "/admin/Companies", element: <Companies /> },
        { path: "/admin/jobs", element: <Adminjobs /> },
        { path: "/admin/register/company", element: <AdminRegisterCompany /> },
        { path: "/admin/update/company", element: <AdminUpdateCompany /> },
        { path: "/admin/company/info", element: <AdminCompanyDescription /> },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
