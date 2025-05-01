
import { useEffect, useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ApiKeyInput from "./ApiKeyInput";
import BinMarkers from "./BinMarkers";
import CurrentLocationMarker from "./CurrentLocationMarker";

// Create a stable googleMapsApiKey value outside the component
// This prevents the API loader from being called with different options
const googleMapsApiKey = localStorage.getItem('googleMapsApiKey') || '';

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

const MapContainer = () => {
  const [apiKey, setApiKey] = useState(googleMapsApiKey);
  const [showApiKeyInput, setShowApiKeyInput] = useState(!googleMapsApiKey);
  const [map, setMap] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showRoute, setShowRoute] = useState(false);

  // Initialize the Google Maps API loader with stable key reference
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
    id: 'google-map-script'
  });

  // Handle map load
  const onMapLoad = useCallback((map) => {
    setMap(map);
  }, []);

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

  // Render API key input if needed
  if (showApiKeyInput) {
    return (
      <ApiKeyInput 
        onApiKeySubmit={(newApiKey) => {
          localStorage.setItem('googleMapsApiKey', newApiKey);
          setApiKey(newApiKey);
          setShowApiKeyInput(false);
          window.location.reload(); // Reload to apply new API key
        }}
      />
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

  return (
    <Card className="col-span-3 row-span-4 overflow-hidden">
      <CardHeader className="p-4 flex flex-row justify-between items-center">
        <CardTitle>Smart Bin Map</CardTitle>
        <MapLegend />
      </CardHeader>
      <CardContent className="p-0 relative" style={{ height: "calc(100% - 57px)" }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={DEFAULT_CENTER}
          zoom={14}
          options={mapOptions}
          onLoad={onMapLoad}
        >
          <BinMarkers 
            onMarkerClick={setSelectedMarker} 
            selectedMarker={selectedMarker}
            clearSelectedMarker={() => setSelectedMarker(null)}
            startNavigation={startNavigation}
          />
          
          <CurrentLocationMarker position={{ lat: DEFAULT_CENTER.lat - 0.01, lng: DEFAULT_CENTER.lng }} />
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

// Simple map legend component
const MapLegend = () => (
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
);

export default MapContainer;
