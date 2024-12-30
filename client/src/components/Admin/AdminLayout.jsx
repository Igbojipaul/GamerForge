import React from "react";
import { Outlet } from "react-router-dom";
import NavigationSideBar from "./NavigationSideBar";
import Header from "./Header";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-900 ">
      {/* Sidebar */}
      <NavigationSideBar className="w-64 bg-gray-800 text-white" />

      {/* Main content */}
      <div className="flex-1 flex flex-col  ">
        {/* Header */}
        <Header className="bg-gray-800 text-white" />

        {/* Dashboard Content */}
        <ScrollArea className="p-4 flex-grow flex-1 w-full h-full">
          <Outlet />
        </ScrollArea>
      </div>
    </div>
  );
};

export default AdminLayout;
