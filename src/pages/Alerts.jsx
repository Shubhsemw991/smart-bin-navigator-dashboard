
import Layout from "@/components/dashboard/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Alerts = () => {
  return (
    <Layout>
      <Card className="h-[calc(100vh-9rem)]">
        <CardHeader>
          <CardTitle>System Alerts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center justify-center h-full bg-muted/20">
            <div className="text-center">
              <h3 className="text-lg font-medium">All System Alerts</h3>
              <p className="text-muted-foreground">Monitor and respond to all system alerts</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Alerts;
