
import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [notifications] = useState<Array<{id: string, message: string, time: string}>>([
    { 
      id: "1", 
      message: "Bin #42 is now 90% full", 
      time: "5 minutes ago" 
    },
    { 
      id: "2", 
      message: "Bin #17 battery is low", 
      time: "20 minutes ago" 
    },
    { 
      id: "3", 
      message: "Collection route #3 completed", 
      time: "1 hour ago" 
    }
  ]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
      <h1 className="text-xl font-semibold">Smart Bin Navigator</h1>
      
      <div className="ml-auto flex items-center gap-4">
        <div className="relative w-60">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search bins, routes..."
            className="w-full pl-9"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {notifications.length}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between p-2">
              <span className="text-sm font-medium">Notifications</span>
              <Button variant="ghost" size="sm" className="text-xs">
                Mark all as read
              </Button>
            </div>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="cursor-pointer p-3">
                <div>
                  <div className="text-sm">{notification.message}</div>
                  <div className="text-xs text-muted-foreground">{notification.time}</div>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center p-2">
              <span className="text-sm text-primary">View all notifications</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
