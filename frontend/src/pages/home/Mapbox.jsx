import React from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Importing Mapbox CSS

const Mapbox = () => {
    const mapboxToken = "pk.eyJ1Ijoiam9lbG1hcDEiLCJhIjoiY2x1dGtqM2M3MHlrMDJpdWpxbXRxZnllbSJ9.HYjeRwB2Xtl8c7zMgVcxvQ"; // Replace with your actual token

    return (
        <ReactMapGL
            mapboxApiAccessToken={mapboxToken}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            width={600}
            height={400}
            latitude={9.005401} // Latitude of Addis Ababa
            longitude={38.763611} // Longitude of Addis Ababa
            zoom={6}
        />
    );
}

export default Mapbox;
