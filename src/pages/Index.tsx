
import Layout from "@/components/dashboard/Layout";
import BinMap from "@/components/dashboard/BinMap";
import StatsRow from "@/components/dashboard/StatsRow";
import BinStatus from "@/components/dashboard/BinStatus";
import CollectionStats from "@/components/dashboard/CollectionStats";
import RouteOptimization from "@/components/dashboard/RouteOptimization";
import AlertsCard from "@/components/dashboard/AlertsCard";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <StatsRow />
        
        <div className="grid grid-cols-4 gap-4">
          <BinMap />
          
          <div className="col-span-1 space-y-4">
            <BinStatus />
            <CollectionStats />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <RouteOptimization />
          <AlertsCard />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
