
import Layout from "@/components/dashboard/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  return (
    <Layout>
      <Card className="h-[calc(100vh-9rem)]">
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center justify-center h-full bg-muted/20">
            <div className="text-center">
              <h3 className="text-lg font-medium">Settings & Configuration</h3>
              <p className="text-muted-foreground">Manage system preferences and integration settings</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Settings;
