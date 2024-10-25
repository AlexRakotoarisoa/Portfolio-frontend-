import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = ({ latitude, longitude }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const position = [latitude, longitude];

  useEffect(() => {
    // Obtenir la position actuelle de l'utilisateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
        }
      );
    }
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={11.5}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {currentPosition && (
        <>
          {/* Marqueur pour la position actuelle */}
          <Marker position={currentPosition}>
            <Popup>Position actuelle</Popup>
          </Marker>

          {/* Marqueur pour la destination */}
          <Marker position={position}>
            <Popup>AEC Sarl</Popup>
          </Marker>

          {/* Tracer le trajet entre la position actuelle et la destination */}
          <Polyline 
            positions={[currentPosition, position]} 
            color="red" // Couleur de la ligne
            weight={5} // Épaisseur de la ligne
          />
        </>
      )}
    </MapContainer>
  );
};

export default Map;
