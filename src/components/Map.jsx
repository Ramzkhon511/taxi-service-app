import React, { useEffect } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
  LayersControl,
} from "react-leaflet";

import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../hook/useGeolocation";
import { useUrlPosition } from "../hook/useUrlPosition";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

const regions = [
  {
    name: "Tashkent",
    location: [41.2995, 69.2401],
  },
  {
    name: "Andijan",
    location: [40.7812, 72.3452],
  },
  {
    name: "Namangan",
    location: [41.0006, 71.6722],
  },
  {
    name: "Fergana",
    location: [40.3848, 71.7842],
  },
  {
    name: "Samarkand",
    location: [39.627, 66.9748],
  },
  {
    name: "Bukhara",
    location: [39.7685, 64.455],
  },
];

const Map = ({ to, mapPosition, setMapPosition }) => {
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);

  return (
    <div className="h-[calc(100vh-4rem)] z-0 relative w-full">
      <button
        onClick={getPosition}
        className="absolute top-0 right-0 z-0 p-4 bg-white bg-opacity-90"
      >
        {isLoadingPosition ? "Loading..." : "My position"}
      </button>

      <MapContainer
        center={mapPosition}
        zoom={7}
        scrollWheelZoom={true}
        className="h-full w-full"
        style={{ height: "100%", width: "100%", padding: 0, zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        <Marker position={mapPosition}>
          <Popup>
            <span>Your location</span>
          </Popup>
        </Marker>

        {/* Destiny */}

        <Marker
          position={
            regions.find((region) => region.name === to)?.location || [
              39.7685, 64.455,
            ]
          }
          icon={L.icon({
            iconUrl: "https://img.icons8.com/color/48/000000/marker.png",
            iconSize: [38, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
          })}
        >
          <Popup>
            <span>Destination</span>
          </Popup>
        </Marker>

        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.base}
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

const DetectClick = () => {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });

  return null;
};

export default Map;
