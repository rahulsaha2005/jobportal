import { Link } from "react-router-dom";
import { Button } from "../ui/button.jsx";

// ui shade cn , we add externally
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
import { Avatar, AvatarImage } from "../ui/avatar.jsx";
import { LogOut, User2 } from "lucide-react";

export const Navbar = () => {
  const user = false;
  const popContent = (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        {/* --------------------------------------------------------------------------------------------------------------------------------------- */}
        <div className="flex gap-4 space-y-2">
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>
          {/* containing details for user we need to update when we have backened data who login with it */}
          <div>
            <h4 className="font-medium">Rahul Saha</h4>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium"> Status - </span> Student
            </p>
          </div>
          {/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */}
        </div>
        <div className="flex flex-col text-gray-600">
          <div className="flex w-fit items-center gap-2 cursor-pointer">
            <User2 className="text-blue-500" />
            <Button className="cursor-pointer" variant="link">
              View Profile
            </Button>
          </div>
          <div className="flex w-fit items-center gap-2 cursor-pointer">
            <LogOut className="text-red-500" />
            <Button className="cursor-pointer" variant="link">
              Logout
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  const LoginSignup = (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button
        className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200 px-4 py-2 rounded w-full sm:w-auto"
        variant="outline"
      >
        LOGIN
      </Button>
      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200 px-4 py-2 rounded w-full sm:w-auto">
        SIGN UP
      </Button>
    </div>
  );

  return (
    <div className="bg-white ">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-16 px-4">
        <h1 className="text-2xl font-bold ">
          Job<span className="text-indigo-600 hover:text-indigo-800">Sphere</span>
        </h1>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>
          {!user ? LoginSignup : popContent}
        </div>
      </div>
    </div>
  );
};
