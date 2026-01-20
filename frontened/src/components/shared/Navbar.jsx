import { useState, useEffect } from "react";
import { Button } from "../ui/button.jsx";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
import { Avatar, AvatarImage } from "../ui/avatar.jsx";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant.js";
import { toast } from "sonner";
import axios from "axios";
import { setAuthUser } from "../../redux/authSlice.js";
import { setAllJobs, setSingleJob } from "../../redux/jobSlice.js";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Scroll state for fade effect
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Logout function
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast("Logout successfully");
        dispatch(setAuthUser(null));
        dispatch(setAllJobs(null));
        dispatch(setSingleJob(null));
        navigate("/login");
      }
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  // Profile Popover content
  const popContent = (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
            alt={user?.fullname || "Profile"}
          />
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <div className="flex items-center gap-4 mb-4">
          <Avatar>
            <AvatarImage
              src={
                user?.profile?.profilePhoto || "https://github.com/shadcn.png"
              }
              alt={user?.fullname}
            />
          </Avatar>
          <div>
            <h4 className="font-medium">{user?.fullname}</h4>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Status - </span>
              {user?.role}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-gray-600">
          {user?.role === "student" && (
            <div className="flex items-center gap-2 cursor-pointer">
              <User2 className="text-blue-500" />
              <Button variant="link" asChild>
                <Link to="/profile">View Profile</Link>
              </Button>
            </div>
          )}

          <div className="flex items-center gap-2 cursor-pointer">
            <LogOut className="text-red-500" />
            <Button variant="link" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  // Login / Signup buttons
  const LoginSignup = (
    <div className="flex flex-col sm:flex-row gap-2">
      <Link to="/login">
        <Button className="w-full sm:w-auto px-6 py-3 rounded-full bg-indigo-600 text-white font-medium shadow-md  hover:bg-indigo-700 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
          LOGIN
        </Button>
      </Link>
      <Link to="/signup">
        <Button className="w-full sm:w-auto px-6 py-3 rounded-full  bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
          SIGN UP
        </Button>
      </Link>
    </div>
  );

  return (
    <nav
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow  ${
        scrolled ? "opacity-80 py-2" : "opacity-100 py-4"
      }`}
    >
      <div className="flex items-center justify-between mx-auto max-w-6xl px-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-black">
          Job
          <span className="text-indigo-600 hover:text-indigo-800">Sphere</span>
        </h1>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5 text-black">
            {user?.role === "recruiter" ? (
              <>
                {/* {"recruiter side "} */}
                <li className="hover:text-indigo-600 cursor-pointer transition-colors duration-200">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:text-indigo-600 cursor-pointer transition-colors duration-200">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-indigo-600 cursor-pointer transition-colors duration-200">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-indigo-600 cursor-pointer transition-colors duration-200">
                  <Link to="/Jobs">Jobs</Link>
                </li>
                <li className="hover:text-indigo-600 cursor-pointer transition-colors duration-200">
                  <Link to="/Browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? LoginSignup : popContent}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white/90">
          <ul className="flex flex-col gap-2 text-black">
            <li className="hover:text-indigo-600 cursor-pointer transition-colors duration-200">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors duration-200">
              <Link to="/Jobs">Jobs</Link>
            </li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors duration-200">
              <Link to="/Browse">Browse</Link>
            </li>
          </ul>
          {!user && LoginSignup}
          {user && popContent}
        </div>
      )}
    </nav>
  );
};
