
import { Marker } from "@react-google-maps/api";

const CurrentLocationMarker = ({ position }) => {
  return (
    <Marker
      position={position}
      icon={{
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#3B82F6',
        fillOpacity: 1,
        scale: 8,
        strokeColor: 'white',
        strokeWeight: 2,
      }}
    />
  );
};

export default CurrentLocationMarker;
