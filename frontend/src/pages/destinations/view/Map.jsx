import React, { useState, useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const Map = ({ destinations, initialCenter, zoomLevel }) => {
  const [map, setMap] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDQF6yiJB2nHBGgjZm_Mhl4LdrMvn_bhRQ", // Replace with your API key
  });

  useEffect(() => {
    if (isLoaded && !map) {
      const google = window.google;
      const mapContainer = document.getElementById('map');
      const markers = []; // Array to store markers

      // Create markers for each destination
      destinations.forEach((destination) => {
        const marker = new google.maps.Marker({
          position: { lat: destination.location.latitude, lng: destination.location.longitude },
          map: map,
          title: destination.name,
        });
        markers.push(marker);
      });

      const options = {
        center: initialCenter,
        zoom: zoomLevel,
      };
      setMap(new google.maps.Map(mapContainer, options));

      // Optional: Fit map bounds to include all markers
      if (markers.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach((marker) => {
          bounds.extend(marker.getPosition());
        });
        map.fitBounds(bounds);
      }
    }
  }, [isLoaded, map, destinations, initialCenter, zoomLevel]);

  if (loadError) return <div>Map failed to load</div>;
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
};

export default Map;