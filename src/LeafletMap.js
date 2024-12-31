import React, { useEffect, useRef } from "react";
import L from "leaflet";

const LeafletMap = ({ latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize the map
    const map = L.map(mapRef.current).setView([latitude, longitude], 15);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Add marker
    L.marker([latitude, longitude]).addTo(map);

    return () => {
      map.remove(); // Cleanup on unmount
    };
  }, [latitude, longitude]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>;
};

export default LeafletMap;
