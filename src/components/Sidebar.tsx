import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  History, 
  Trophy, 
  LineChart,
  Dumbbell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const location = useLocation();
  
  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/history", label: "Workout History", icon: History },
    { href: "/records", label: "Personal Records", icon: Trophy },
    { href: "/progress", label: "Progress Charts", icon: LineChart },
  ];

  return (
    <div className="hidden border-r bg-muted/40 md:block md:w-64 lg:w-72">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <Dumbbell className="h-6 w-6" />
            <span>FitTrack</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="px-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Button
                  key={item.href}
                  variant={isActive ? "secondary" : "ghost"}
                  asChild
                  className={cn(
                    "w-full justify-start",
                    isActive ? "bg-secondary" : "hover:bg-muted"
                  )}
                >
                  <Link to={item.href} className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}