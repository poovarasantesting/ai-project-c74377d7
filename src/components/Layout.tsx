import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="container py-6 md:py-8 max-w-6xl">
            <Outlet />
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}