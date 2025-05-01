
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Navigation,
  BarChart2,
  Settings,
  LayoutDashboard,
  Menu,
  X,
  AlertCircle,
  Map
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const NavItem = ({ 
    icon: Icon, 
    label, 
    active, 
    href 
  }: { 
    icon: React.ElementType; 
    label: string; 
    active: boolean; 
    href: string;
  }) => (
    <Link 
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        active 
          ? "bg-primary text-primary-foreground" 
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
      onClick={() => setActivePage(label.toLowerCase())}
    >
      <Icon className="h-5 w-5" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );

  return (
    <div
      className={cn(
        "flex h-screen flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center px-3 border-b border-sidebar-border">
        {!collapsed && (
          <span className="text-xl font-semibold text-sidebar-foreground">
            SmartBin
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "ml-auto text-sidebar-foreground",
            collapsed && "mx-auto"
          )}
          onClick={toggleSidebar}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>
      
      <nav className="flex-1 space-y-1 p-2">
        <NavItem
          icon={LayoutDashboard}
          label="Dashboard"
          active={activePage === "dashboard"}
          href="/"
        />
        <NavItem
          icon={Map}
          label="Map View"
          active={activePage === "map view"}
          href="/map"
        />
        <NavItem
          icon={Navigation}
          label="Routes"
          active={activePage === "routes"}
          href="/routes"
        />
        <NavItem
          icon={BarChart2}
          label="Analytics"
          active={activePage === "analytics"}
          href="/analytics"
        />
        <NavItem
          icon={AlertCircle}
          label="Alerts"
          active={activePage === "alerts"}
          href="/alerts"
        />
        <NavItem
          icon={Settings}
          label="Settings"
          active={activePage === "settings"}
          href="/settings"
        />
      </nav>
      
      <div className="border-t border-sidebar-border p-2">
        <div className="flex items-center gap-3 py-2 px-3">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            {collapsed ? "M" : <span>M</span>}
          </div>
          {!collapsed && (
            <div>
              <div className="text-sm font-medium text-sidebar-foreground">Municipal Admin</div>
              <div className="text-xs text-sidebar-foreground/70">admin@city.gov</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
