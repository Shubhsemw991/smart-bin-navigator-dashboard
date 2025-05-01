
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { mockBins } from "@/lib/mockData";

const BinStatus = () => {
  const sortedBins = [...mockBins].sort((a, b) => b.fillLevel - a.fillLevel).slice(0, 5);

  const getProgressColor = (fillLevel: number) => {
    if (fillLevel >= 90) return "bg-binHigh";
    if (fillLevel >= 70) return "bg-binMedium";
    return "bg-binLow";
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Critical Bins Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedBins.map((bin) => (
            <div key={bin.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Bin #{bin.id}
                  {bin.hasAlert && (
                    <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-binAlert animate-pulse-alert"></span>
                  )}
                </span>
                <span className="text-sm text-muted-foreground">{bin.location.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Progress 
                  value={bin.fillLevel} 
                  className={cn("h-2")}
                  indicatorClassName={getProgressColor(bin.fillLevel)}
                />
                <span className="text-sm text-muted-foreground w-9">{bin.fillLevel}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BinStatus;
