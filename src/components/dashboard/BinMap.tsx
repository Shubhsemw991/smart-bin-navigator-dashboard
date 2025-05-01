
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockBins } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const BinMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedBin, setSelectedBin] = useState<any>(null);
  const [showRoute, setShowRoute] = useState(false);

  useEffect(() => {
    // This would normally be loaded from your Google Maps API
    // For the prototype we'll show a placeholder map image
    const loadMap = () => {
      if (mapContainerRef.current) {
        // Map init would happen here with actual Google Maps API
        console.log("Map loaded");
      }
    };

    loadMap();
    return () => {
      // Cleanup would happen here
    };
  }, []);

  const handleBinClick = (bin: any) => {
    setSelectedBin(bin);
    setShowRoute(false);
  };

  const startNavigation = () => {
    setShowRoute(true);
    // In a real app, this would trigger the navigation system
    console.log(`Starting navigation to bin ${selectedBin.id}`);
  };

  return (
    <Card className="col-span-3 row-span-4 overflow-hidden">
      <CardHeader className="p-4 flex flex-row justify-between items-center">
        <CardTitle>Smart Bin Map</CardTitle>
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-binLow"></span>
            <span className="text-xs">Low</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-binMedium"></span>
            <span className="text-xs">Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-binHigh"></span>
            <span className="text-xs">High</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-binAlert animate-pulse-alert"></span>
            <span className="text-xs">Alert</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 relative" style={{ height: "calc(100% - 57px)" }}>
        {/* Map Container */}
        <div 
          ref={mapContainerRef} 
          className="absolute inset-0 bg-gray-200"
        >
          {/* Mock map with sample bins */}
          <div className="relative w-full h-full overflow-hidden bg-[#EBF3FB] p-4">
            {/* This would be replaced with actual Google Maps */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Mock city grid */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
                  {Array.from({ length: 8 }).map((_, rowIndex) => (
                    Array.from({ length: 8 }).map((_, colIndex) => (
                      <div 
                        key={`${rowIndex}-${colIndex}`}
                        className="border border-blue-200/30"
                      />
                    ))
                  ))}
                </div>
                
                {/* Mock roads */}
                <div className="absolute left-[12.5%] top-0 bottom-0 w-[2%] bg-gray-300"></div>
                <div className="absolute left-[37.5%] top-0 bottom-0 w-[2%] bg-gray-300"></div>
                <div className="absolute left-[62.5%] top-0 bottom-0 w-[2%] bg-gray-300"></div>
                <div className="absolute left-[87.5%] top-0 bottom-0 w-[2%] bg-gray-300"></div>
                <div className="absolute top-[12.5%] left-0 right-0 h-[2%] bg-gray-300"></div>
                <div className="absolute top-[37.5%] left-0 right-0 h-[2%] bg-gray-300"></div>
                <div className="absolute top-[62.5%] left-0 right-0 h-[2%] bg-gray-300"></div>
                <div className="absolute top-[87.5%] left-0 right-0 h-[2%] bg-gray-300"></div>

                {/* Bins */}
                {mockBins.map((bin) => (
                  <div
                    key={bin.id}
                    className={cn(
                      "absolute w-4 h-4 rounded-full cursor-pointer transition-transform transform hover:scale-150",
                      bin.fillLevel >= 90 ? "bg-binHigh" : 
                      bin.fillLevel >= 70 ? "bg-binMedium" : 
                      "bg-binLow",
                      bin.hasAlert && "animate-pulse-alert",
                      selectedBin?.id === bin.id && "ring-2 ring-white"
                    )}
                    style={{ 
                      left: `${bin.location.x}%`, 
                      top: `${bin.location.y}%`,
                      transform: `translate(-50%, -50%) ${selectedBin?.id === bin.id ? 'scale(1.5)' : ''}`
                    }}
                    onClick={() => handleBinClick(bin)}
                  />
                ))}

                {/* Navigation route */}
                {showRoute && selectedBin && (
                  <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
                    <path 
                      d={`M 50,95 Q 50,${selectedBin.location.y + 20} ${selectedBin.location.x},${selectedBin.location.y}`} 
                      stroke="rgba(37, 99, 235, 0.8)" 
                      strokeWidth="3" 
                      strokeDasharray="5,5"
                      fill="none"
                    />
                  </svg>
                )}

                {/* Current location */}
                <div 
                  className="absolute w-5 h-5 bg-blue-500 rounded-full border-2 border-white" 
                  style={{ left: '50%', top: '95%', transform: 'translate(-50%, -50%)' }}
                >
                  <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Bin Info */}
        {selectedBin && (
          <div className="absolute bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg w-64">
            <h3 className="text-lg font-medium">Bin #{selectedBin.id}</h3>
            <p className="text-sm text-gray-500">{selectedBin.location.address}</p>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Fill Level:</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className={cn(
                      "h-2 rounded-full",
                      selectedBin.fillLevel >= 90 ? "bg-binHigh" : 
                      selectedBin.fillLevel >= 70 ? "bg-binMedium" : 
                      "bg-binLow"
                    )}
                    style={{ width: `${selectedBin.fillLevel}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{selectedBin.fillLevel}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Battery:</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className={cn(
                      "h-2 rounded-full",
                      selectedBin.battery < 20 ? "bg-binHigh" : 
                      selectedBin.battery < 50 ? "bg-binMedium" : 
                      "bg-binLow"
                    )}
                    style={{ width: `${selectedBin.battery}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{selectedBin.battery}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Last Emptied:</span>
                <span className="text-sm font-medium">{selectedBin.lastEmptied}</span>
              </div>
              {selectedBin.hasAlert && (
                <div className="text-sm text-binAlert font-medium">
                  Alert: {selectedBin.alertMessage}
                </div>
              )}
              <button 
                className="w-full mt-2 bg-primary text-white py-1 px-3 rounded-md text-sm hover:bg-primary/90 transition-colors"
                onClick={startNavigation}
              >
                Navigate to Bin
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BinMap;
