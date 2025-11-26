import { createBrowserRouter } from "react-router-dom";
import { Navbar } from "./components/shared/navbar";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
const appRouter = createBrowserRouter([
  {
    path: "/",
    // element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
function App() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-svh flex-col items-center justify-center">
        {/* <Button>Click me</Button> */}
      </div>
    </>
  );
}
export default App;
