import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import "./AuthLayout.css";

// Auth.js

const AuthLayout = () => {
  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div className="relative hidden w-full bg-black md:flex md:w-1/2">
        <div className="flex flex-wrap items-center justify-center w-full h-full p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 w-36 h-36 animate-pulse"></div>
            <div className="bg-gray-800 w-36 h-36 animate-pulse"></div>
            <div className="bg-gray-800 w-36 h-36 animate-pulse"></div>
            <div className="bg-gray-800 w-36 h-36 animate-pulse"></div>
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-2 font-bold text-purple-700 text-7xl"
          >
            GamerForge
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="mt-2 text-xl text-purple-400"
          >
            Forge Your Ultimate Gaming Gear...
          </motion.p>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex flex-col items-center justify-center w-full h-screen gap-3 bg-gray-100 md:w-1/2">
      <h3 className="mt-10 mb-3 text-3xl font-bold text-center text-purple-500">Welcome to GamerForge</h3>
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
