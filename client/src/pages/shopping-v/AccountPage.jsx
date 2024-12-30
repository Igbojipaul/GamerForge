import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"; // Example import path
import Orders from "@/components/account/Orders";
import GameForgeProfile from "@/components/account/GameForgeProfile";
import AddressBook from "@/components/account/AddressBook";
import PendingReviews from "@/components/account/PendingReviews";
import { useState } from "react";

export default function UserAccountPage() {
  const [activeSection, setActiveSection] = useState("profile");

  const checkActive = (nav) => {
    return nav === activeSection ? "text-purple-600" : "";
  };


  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <GameForgeProfile />;
      case "orders":
        return <Orders />;
      case "addresses":
        return <AddressBook />;
      case "savedItems":
        return <AddressBook />;
      case "pendingReviews":
        return <PendingReviews />;
      default:
        return <GameForgeProfile />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex gap-5">
        <Sidebar className="top-20 ">
          <SidebarContent className="bg-slate-800">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem
                    className={`text-gray border-solid h-[50px]  flex items-center text-lg font-semibold  hover: text-stone-500 cursor-pointer ${checkActive(
                      "profile"
                    )}`}
                    onClick={() => setActiveSection("profile")}>
                    Profile
                  </SidebarMenuItem>
                  <SidebarMenuItem
                    className={`text-gray border-solid h-[50px]  flex items-center text-lg font-semibold  hover: text-stone-500 cursor-pointer ${checkActive(
                      "orders"
                    )}`}
                    onClick={() => setActiveSection("orders")}>
                    Orders
                  </SidebarMenuItem>
                  <SidebarMenuItem
                    className={`text-gray border-solid h-[50px]  flex items-center text-lg font-semibold  hover: text-stone-500 cursor-pointer ${checkActive(
                      "savedItems"
                    )}`}
                    onClick={() => setActiveSection("savedItems")}>
                    Saved Items
                  </SidebarMenuItem>
                  <SidebarMenuItem
                    className={`text-gray border-solid h-[50px]  flex items-center text-lg font-semibold  hover: text-stone-500 cursor-pointer ${checkActive(
                      "pendingReviews"
                    )}`}
                    onClick={() => setActiveSection("pendingReviews")}>
                    Pending Reviews
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-6 mt-10 border-t-purple-400">
          {renderSection()}
        </main>
      </div>
    </SidebarProvider>
  );
}
