import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, ShoppingCart, Package, Users, Settings } from "lucide-react";
import { images } from "@/constants";

const NavigationSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // To get current route

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "bg-gray-700 text-white" // Active link styling
      : "text-gray-400 hover:bg-gray-700 hover:text-white"; // Inactive link styling
  };

  return (
    <nav
      className={`h-full ${
        isOpen ? "w-64" : "w-20"
      } bg-gray-800 shadow-lg transition-width duration-300 flex flex-col items-center`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Image Container */}
      <div className="flex justify-center items-center py-6">
        <img
          className={`${
            isOpen ? "w-32 h-32" : "w-12 h-12"
          } transition-all duration-300 object-contain`}
          src={images.gamePad}
          alt="adminLogo"
        />
      </div>

      <ul className="mt-10 space-y-4 w-full">
        {/* Dashboard */}
        <li className={getLinkClass("/admin/dashboard")}>
          <NavLink
            to="/admin/dashboard"
            className="py-4 px-6 flex items-center"
          >
            <Home className="w-6 h-6" />
            {isOpen && <span className="ml-4">Dashboard</span>}
          </NavLink>
        </li>
        {/* Products */}
        <li className={getLinkClass("/admin/products")}>
          <NavLink
            to="/admin/products"
            className="py-4 px-6 flex items-center"
          >
            <Package className="w-6 h-6" />
            {isOpen && <span className="ml-4">Products</span>}
          </NavLink>
        </li>
        {/* Orders */}
        <li className={getLinkClass("/admin/orders")}>
          <NavLink to="/admin/orders" className="py-4 px-6 flex items-center">
            <ShoppingCart className="w-6 h-6" />
            {isOpen && <span className="ml-4">Orders</span>}
          </NavLink>
        </li>
        {/* Users */}
        <li className={getLinkClass("/admin/users")}>
          <NavLink to="/admin/users" className="py-4 px-6 flex items-center">
            <Users className="w-6 h-6" />
            {isOpen && <span className="ml-4">Users</span>}
          </NavLink>
        </li>
        {/* Settings */}
        <li className={getLinkClass("/admin/settings")}>
          <NavLink to="/admin/settings" className="py-4 px-6 flex items-center">
            <Settings className="w-6 h-6" />
            {isOpen && <span className="ml-4">Settings</span>}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationSideBar;
