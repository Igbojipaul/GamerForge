import { Bell, LogOut, Menu, User } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser } from "@/redux/slices/authentication";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";

const Header = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const { toast } = useToast();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Toggle menu visibility for small screens
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle profile dropdown visibility
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="w-full bg-gray-800 shadow-lg sticky top-0 z-50 px-6 py-4">
      <div className="flex justify-end items-center">
        <div className="flex items-center md:hidden">
          <Button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        <div className="hidden md:flex justify-end items-center space-x-6">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 text-white px-4 py-2 rounded-lg w-64 focus:outline-none"
            />
          </div>

          <Button>
            <Bell color="white" />
          </Button>

          {/* Profile Dropdown */}
          <div className="relative">
            <Button
              onClick={toggleProfile}
              className="flex items-center text-white focus:outline-none"
            >
              <Avatar>
                <AvatarImage src={user?.image} />
                <AvatarFallback className="bg-gray-600 uppercase">
                  {user?.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <span className="ml-2">Admin</span>
            </Button>

            {/* Profile Dropdown Items */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg">
                <ul className="py-2 text-white">
                  <li
                    className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex justify-between"
                    onClick={() => {}}
                  >
                    View Profile <User />
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex justify-between"
                    onClick={() =>
                      dispatch(logoutUser()).then((res) => {
                        toast({
                          title: `${res.payload}`,
                        });
                      })
                    }
                  >
                    Logout <LogOut />
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown for small screens */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 text-white px-4 py-2 rounded-lg w-full focus:outline-none"
            />
            <Button className="self-end">
              <Bell color="white" />
            </Button>

            {/* Profile Dropdown for small screens */}
            <div className="relative">
              <Button
                onClick={toggleProfile}
                className="flex items-center text-white focus:outline-none"
              >
                <Avatar>
                  <AvatarImage src={user?.image} />
                  <AvatarFallback className="bg-gray-600 uppercase">
                    {user?.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="ml-2">Admin</span>
              </Button>

              {isProfileOpen && (
                <div className="mt-2 w-full bg-gray-700 rounded-lg shadow-lg">
                  <ul className="py-2 text-white">
                    <li
                      className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                      onClick={() => console.log("View Profile")}
                    >
                      View Profile
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                      onClick={() => console.log("Logout")}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
