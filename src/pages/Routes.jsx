
import Layout from "@/components/dashboard/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WasteSegregation from "@/components/dashboard/WasteSegregation";

const RoutesPlanningPage = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <Card className="h-[calc(100vh-18rem)]">
          <CardHeader>
            <CardTitle>Route Planning</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex items-center justify-center h-full bg-muted/20">
              <div className="text-center">
                <h3 className="text-lg font-medium">Collection Route Planning</h3>
                <p className="text-muted-foreground">Optimize waste collection routes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <WasteSegregation />
      </div>
    </Layout>
  );
};

export default RoutesPlanningPage;
