
import { Trash2, Battery, AlertCircle, TrendingUp } from "lucide-react";
import StatCard from "./StatCard";
import { getOverallStats } from "@/lib/mockData";

const StatsRow = () => {
  const stats = getOverallStats();
  
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard
        title="Total Bins"
        value={stats.total}
        icon={<Trash2 className="h-4 w-4" />}
        description="Smart bins deployed"
        trend={{ value: 5, isPositive: true }}
      />
      <StatCard
        title="Average Fill Level"
        value={`${stats.averageFillLevel}%`}
        icon={<TrendingUp className="h-4 w-4" />}
        description="Across all bins"
        trend={{ value: 12, isPositive: false }}
      />
      <StatCard
        title="Bins Needing Collection"
        value={stats.needCollection}
        icon={<Trash2 className="h-4 w-4" />}
        description="Fill level above 80%"
        trend={{ value: 8, isPositive: false }}
      />
      <StatCard
        title="Critical Alerts"
        value={stats.criticalBins}
        icon={<AlertCircle className="h-4 w-4" />}
        description="Immediate action needed"
        trend={{ value: 2, isPositive: false }}
      />
    </div>
  );
};

export default StatsRow;
