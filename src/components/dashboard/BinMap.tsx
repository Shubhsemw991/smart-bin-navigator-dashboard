
import { useEffect, useRef, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockBins } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";

// Default map center - can be adjusted as needed
const DEFAULT_CENTER = { lat: 40.7128, lng: -74.006 };

// Map container style
const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

// Map options
const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
};

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

const BinMap = () => {
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('googleMapsApiKey'));
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(!apiKey);
  const [markers, setMarkers] = useState<any[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [showRoute, setShowRoute] = useState(false);

  // Initialize the Google Maps API loader
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey || '',
    id: 'google-map-script'
  });

  // Set up markers based on mock data
  useEffect(() => {
    if (isLoaded) {
      const binMarkers = convertBinsToMarkers(mockBins);
      setMarkers(binMarkers);
    }
  }, [isLoaded]);

  // Set up directions renderer when map is loaded
  useEffect(() => {
    if (isLoaded && map) {
      const renderer = new google.maps.DirectionsRenderer({
        map,
        suppressMarkers: false,
      });
      setDirectionsRenderer(renderer);
    }
  }, [isLoaded, map]);

  // Handle bin selection
  const handleMarkerClick = (marker: any) => {
    setSelectedMarker(marker);
    setShowRoute(false);
    
    if (directionsRenderer) {
      directionsRenderer.setMap(null);
      directionsRenderer.setMap(map);
    }
  };

  // Start navigation to the selected bin
  const startNavigation = () => {
    if (!isLoaded || !map || !selectedMarker || !directionsRenderer) return;
    
    const directionsService = new google.maps.DirectionsService();
    
    // Simulating current location as slightly south of the map center
    const currentLocation = { 
      lat: DEFAULT_CENTER.lat - 0.01, 
      lng: DEFAULT_CENTER.lng 
    };
    
    directionsService.route(
      {
        origin: currentLocation,
        destination: selectedMarker.position,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRenderer.setDirections(result);
          setShowRoute(true);
        } else {
          console.error(`Navigation error: ${status}`);
        }
      }
    );
  };

  // Handle map load
  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  // Handle API key submission
  const handleApiKeySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('apiKey') as HTMLInputElement;
    const newApiKey = input.value.trim();
    if (newApiKey) {
      localStorage.setItem('googleMapsApiKey', newApiKey);
      setApiKey(newApiKey);
      setShowApiKeyInput(false);
      window.location.reload(); // Reload to apply new API key
    }
  };

  // Render API key input if needed
  if (showApiKeyInput) {
    return (
      <Card className="col-span-3 row-span-4 overflow-hidden">
        <CardHeader className="p-4">
          <CardTitle>Google Maps Setup</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <p>To use Google Maps, you need to enter your Google Maps API key.</p>
            <form onSubmit={handleApiKeySubmit} className="space-y-4">
              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium mb-1">
                  Google Maps API Key
                </label>
                <input
                  id="apiKey"
                  name="apiKey"
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your Google Maps API key"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90"
              >
                Save API Key
              </button>
            </form>
            <div className="text-sm text-muted-foreground mt-4">
              <p>To get a Google Maps API key:</p>
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>Go to the <a href="https://console.cloud.google.com/google/maps-apis/overview" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Cloud Platform Console</a></li>
                <li>Create a project if you don't have one</li>
                <li>Enable the "Maps JavaScript API"</li>
                <li>Create credentials to get your API key</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Handle loading error
  if (loadError) {
    return (
      <Card className="col-span-3 row-span-4 overflow-hidden">
        <CardHeader className="p-4">
          <CardTitle>Map Error</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-destructive">Error loading Google Maps: {loadError.message}</p>
            <button 
              className="mt-4 bg-primary text-white py-2 px-4 rounded-md"
              onClick={() => {
                localStorage.removeItem('googleMapsApiKey');
                setShowApiKeyInput(true);
              }}
            >
              Change API Key
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show loading state
  if (!isLoaded) {
    return (
      <Card className="col-span-3 row-span-4 overflow-hidden">
        <CardHeader className="p-4">
          <CardTitle>Smart Bin Map</CardTitle>
        </CardHeader>
        <CardContent className="p-0 relative" style={{ height: "calc(100% - 57px)" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <p>Loading Google Maps...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Main map component
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
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={DEFAULT_CENTER}
          zoom={14}
          options={mapOptions}
          onLoad={onMapLoad}
        >
          {/* Render all bin markers */}
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              onClick={() => handleMarkerClick(marker)}
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
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="p-1 max-w-xs">
                <h3 className="text-base font-medium">Bin #{selectedMarker.id}</h3>
                <p className="text-sm text-gray-500">{selectedMarker.location.address}</p>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Fill Level:</span>
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={cn(
                          "h-1.5 rounded-full",
                          selectedMarker.fillLevel >= 90 ? "bg-binHigh" : 
                          selectedMarker.fillLevel >= 70 ? "bg-binMedium" : 
                          "bg-binLow"
                        )}
                        style={{ width: `${selectedMarker.fillLevel}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{selectedMarker.fillLevel}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Battery:</span>
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={cn(
                          "h-1.5 rounded-full",
                          selectedMarker.battery < 20 ? "bg-binHigh" : 
                          selectedMarker.battery < 50 ? "bg-binMedium" : 
                          "bg-binLow"
                        )}
                        style={{ width: `${selectedMarker.battery}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{selectedMarker.battery}%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>Last Emptied:</span>
                    <span>{selectedMarker.lastEmptied}</span>
                  </div>
                  {selectedMarker.hasAlert && (
                    <div className="text-xs text-binAlert font-medium">
                      Alert: {selectedMarker.alertMessage}
                    </div>
                  )}
                  <button 
                    className="w-full mt-1 bg-primary text-white py-1 px-2 rounded-md text-xs hover:bg-primary/90 transition-colors"
                    onClick={() => {
                      setSelectedMarker(null);
                      startNavigation();
                    }}
                  >
                    Navigate to Bin
                  </button>
                </div>
              </div>
            </InfoWindow>
          )}

          {/* Current location marker */}
          <Marker
            position={{ lat: DEFAULT_CENTER.lat - 0.01, lng: DEFAULT_CENTER.lng }}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: '#3B82F6',
              fillOpacity: 1,
              scale: 8,
              strokeColor: 'white',
              strokeWeight: 2,
            }}
          />
        </GoogleMap>

        {/* API Key management button */}
        <button
          onClick={() => setShowApiKeyInput(true)}
          className="absolute bottom-3 right-3 bg-white rounded-md p-2 shadow-md text-xs z-10"
        >
          Change API Key
        </button>
      </CardContent>
    </Card>
  );
};

export default BinMap;
