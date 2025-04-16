// src/pages/MapPage.jsx
import React from "react";

const MapPage = () => {
  return (
    <div className="w-full h-screen">
      <iframe
        src="https://www.nps.gov/maps/embed.html?mapId=752dcd04-2cf5-41bc-bfdd-cafd09d83953"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen
        title="National Parks Interactive Map"
      ></iframe>
    </div>
  );
};

export default MapPage;
