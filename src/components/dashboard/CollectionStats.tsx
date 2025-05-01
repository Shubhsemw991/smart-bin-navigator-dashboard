
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const CollectionStats = () => {
  const data = [
    { name: "Empty", value: 25, color: "#ECFDF5" },
    { name: "Low", value: 40, color: "#10B981" },
    { name: "Medium", value: 25, color: "#F59E0B" },
    { name: "Full", value: 10, color: "#EF4444" },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Collection Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">189</span>
            <span className="text-muted-foreground">Total Bins</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">42</span>
            <span className="text-muted-foreground">Need Collection</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollectionStats;
