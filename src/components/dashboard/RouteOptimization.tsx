
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "lucide-react";

const RouteOptimization = () => {
  const routes = [
    { id: "RT-001", bins: 12, time: "1h 45m", distance: "8.5 km", efficiency: "High" },
    { id: "RT-002", bins: 9, time: "1h 20m", distance: "6.2 km", efficiency: "Medium" },
    { id: "RT-003", bins: 15, time: "2h 10m", distance: "11.3 km", efficiency: "High" },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle>Optimized Routes</CardTitle>
            <CardDescription>Today's collection routes</CardDescription>
          </div>
          <Button size="sm" className="h-8">
            Generate New Routes
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-2">
          {routes.map((route) => (
            <div 
              key={route.id} 
              className="flex items-center justify-between px-6 py-3 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Navigation className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">{route.id}</div>
                  <div className="text-xs text-muted-foreground">
                    {route.bins} bins &middot; {route.distance}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground">{route.time}</div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteOptimization;
