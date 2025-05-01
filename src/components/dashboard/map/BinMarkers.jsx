
import { useState, useEffect } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { mockBins } from "@/lib/mockData";
import { cn } from "@/lib/utils";

// Default map center - used for positioning markers
const DEFAULT_CENTER = { lat: 40.7128, lng: -74.006 };

// Convert our mock bins to Google Maps compatible format
const convertBinsToMarkers = (bins) => {
  return bins.map(bin => ({
    ...bin,
    position: {
      lat: (bin.location.y / 100) * 0.1 + DEFAULT_CENTER.lat - 0.05,
      lng: (bin.location.x / 100) * 0.1 + DEFAULT_CENTER.lng - 0.05,
    }
  }));
};

const BinMarkers = ({ onMarkerClick, selectedMarker, clearSelectedMarker, startNavigation }) => {
  const [markers, setMarkers] = useState([]);
  
  // Set up markers based on mock data
  useEffect(() => {
    const binMarkers = convertBinsToMarkers(mockBins);
    setMarkers(binMarkers);
  }, []);

  return (
    <>
      {/* Render all bin markers */}
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          onClick={() => onMarkerClick(marker)}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: 
              marker.fillLevel >= 90 ? '#EF4444' : 
              marker.fillLevel >= 70 ? '#F59E0B' : 
              '#10B981',
            fillOpacity: 1,
            scale: marker.hasAlert ? 8 : 6,
            strokeColor: 'white',
            strokeWeight: 2,
          }}
          animation={marker.hasAlert ? google.maps.Animation.BOUNCE : undefined}
        />
      ))}

      {/* Display info window for selected bin */}
      {selectedMarker && (
        <InfoWindow
          position={selectedMarker.position}
          onCloseClick={clearSelectedMarker}
        >
          <BinInfoContent bin={selectedMarker} onNavigate={() => {
            clearSelectedMarker();
            startNavigation();
          }} />
        </InfoWindow>
      )}
    </>
  );
};

// Helper component for bin info window content
const BinInfoContent = ({ bin, onNavigate }) => (
  <div className="p-1 max-w-xs">
    <h3 className="text-base font-medium">Bin #{bin.id}</h3>
    <p className="text-sm text-gray-500">{bin.location.address}</p>
    <div className="mt-2 space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs">Fill Level:</span>
        <div className="w-16 bg-gray-200 rounded-full h-1.5">
          <div 
            className={cn(
              "h-1.5 rounded-full",
              bin.fillLevel >= 90 ? "bg-binHigh" : 
              bin.fillLevel >= 70 ? "bg-binMedium" : 
              "bg-binLow"
            )}
            style={{ width: `${bin.fillLevel}%` }}
          ></div>
        </div>
        <span className="text-xs">{bin.fillLevel}%</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs">Battery:</span>
        <div className="w-16 bg-gray-200 rounded-full h-1.5">
          <div 
            className={cn(
              "h-1.5 rounded-full",
              bin.battery < 20 ? "bg-binHigh" : 
              bin.battery < 50 ? "bg-binMedium" : 
              "bg-binLow"
            )}
            style={{ width: `${bin.battery}%` }}
          ></div>
        </div>
        <span className="text-xs">{bin.battery}%</span>
      </div>
      <div className="flex justify-between items-center text-xs">
        <span>Last Emptied:</span>
        <span>{bin.lastEmptied}</span>
      </div>
      {bin.hasAlert && (
        <div className="text-xs text-binAlert font-medium">
          Alert: {bin.alertMessage}
        </div>
      )}
      <button 
        className="w-full mt-1 bg-primary text-white py-1 px-2 rounded-md text-xs hover:bg-primary/90 transition-colors"
        onClick={onNavigate}
      >
        Navigate to Bin
      </button>
    </div>
  </div>
);

export default BinMarkers;
