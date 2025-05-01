
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, BatteryLow, Trash, ThermometerSnowflake } from "lucide-react";
import { cn } from "@/lib/utils";

const AlertsCard = () => {
  const alerts = [
    { 
      id: "1", 
      type: "fill", 
      message: "Bin #42 is now 95% full", 
      time: "5 minutes ago",
      icon: Trash,
      severity: "high"
    },
    { 
      id: "2", 
      type: "battery", 
      message: "Bin #17 battery is at 10%", 
      time: "20 minutes ago",
      icon: BatteryLow,
      severity: "medium"
    },
    { 
      id: "3", 
      type: "sensor", 
      message: "Bin #103 temperature sensor malfunction", 
      time: "1 hour ago",
      icon: ThermometerSnowflake,
      severity: "low"
    },
    { 
      id: "4", 
      type: "fill", 
      message: "Bin #29 is now 92% full", 
      time: "2 hours ago",
      icon: Trash,
      severity: "high"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-binHigh bg-red-50";
      case "medium": return "text-binMedium bg-amber-50";
      case "low": return "text-blue-500 bg-blue-50";
      default: return "text-muted-foreground bg-muted";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-binHigh" />
          Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="divide-y">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex gap-3 px-6 py-3 hover:bg-muted/50 cursor-pointer">
              <div className={cn("mt-1 flex h-8 w-8 items-center justify-center rounded-full", getSeverityColor(alert.severity))}>
                <alert.icon className="h-4 w-4" />
              </div>
              <div>
                <div className={cn(
                  "font-medium",
                  alert.severity === "high" && "text-binHigh",
                  alert.severity === "medium" && "text-binMedium",
                )}>
                  {alert.message}
                </div>
                <div className="text-xs text-muted-foreground">{alert.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsCard;
