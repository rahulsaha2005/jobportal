import { useState } from "react";
import { Button } from "../ui/button.jsx";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
import { Avatar, AvatarImage } from "../ui/avatar.jsx";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const Navbar = () => {
  // if user logged in->show user icon
  // else show login logout button
  // using md:hidder for showing mobile type version
  // using hidden md:flex for showing desktop version
  // it show hamburgericon for menu open and X for crossing that icon and hidding
  const { user } = useSelector((state) => state.auth);
  //menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  // using shade ui cn i used avtar and popover for profile view
  const popContent = (
    <Popover>
      {/* as child here used because i don't want brwoswer to add new div to my existing data
      that i sending to broweser to render
     */}
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
      </PopoverTrigger>

      {/* popover content containg image ,name,status ,logout and view prfile */}
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-4">
            {/* image */}
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>

            {/* data  */}
            <div>
              <h4 className="font-medium">{user.fullname}</h4>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Status - </span> {user.role}
              </p>
            </div>
          </div>
        </div>

        {/* view profile */}
        <div className="flex flex-col gap-2 text-gray-600">
          <div className="flex items-center gap-2 cursor-pointer">
            <User2 className="text-blue-500" />
            <Button variant="link" className="cursor-pointer">
              View Profile
            </Button>
          </div>

          {/* logout  */}
          <div className="flex items-center gap-2 cursor-pointer">
            <LogOut className="text-red-500" />
            <Button variant="link" className="cursor-pointer">
              Logout
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  //  login sign button
  const LoginSignup = (
    <div className="flex flex-col sm:flex-row gap-2">
      <Link to="/login">
        <Button
          className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200 px-4 py-2 rounded w-full sm:w-auto"
          variant="outline"
        >
          LOGIN
        </Button>
      </Link>
      <Link to="/signup">
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200 px-4 py-2 rounded w-full sm:w-auto">
          SIGN UP
        </Button>
      </Link>
    </div>
  );

  return (
    // showing website name
    <nav className="bg-white shadow">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-16 px-4">
        <h1 className="text-2xl font-bold">
          Job
          <span className="text-indigo-600 hover:text-indigo-800">Sphere</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
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
        <div className="md:hidden px-4 pb-4 space-y-3">
          <ul className="flex flex-col gap-2">
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
