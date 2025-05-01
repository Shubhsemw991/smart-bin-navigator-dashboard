
import Layout from "@/components/dashboard/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Analytics = () => {
  return (
    <Layout>
      <Card className="h-[calc(100vh-9rem)]">
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center justify-center h-full bg-muted/20">
            <div className="text-center">
              <h3 className="text-lg font-medium">Waste Analytics</h3>
              <p className="text-muted-foreground">View detailed waste collection trends and insights</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Analytics;
