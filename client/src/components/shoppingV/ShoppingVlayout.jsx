import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./footer";
import { SidebarProvider } from "../ui/sidebar";

const ShoppingVlayout = () => {
  return (
    <div className="flex flex-col min-h-screen text-white bg-gray-900 ">
      <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
      <Footer />
    </div>
  );
};

export default ShoppingVlayout;
