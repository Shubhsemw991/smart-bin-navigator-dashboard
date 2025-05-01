
import Layout from "@/components/dashboard/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MapView = () => {
  return (
    <Layout>
      <Card className="h-[calc(100vh-9rem)]">
        <CardHeader>
          <CardTitle>Map View</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center justify-center h-full bg-muted/20">
            <div className="text-center">
              <h3 className="text-lg font-medium">Advanced Map View</h3>
              <p className="text-muted-foreground">Full screen map with extended controls</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default MapView;
