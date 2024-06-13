import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./styles/RoadMap.css";

// Fix marker icon issues with Webpack
delete L.Icon.Default.prototype._getIconUrl;
/* eslint no-underscore-dangle: 0 */
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function RoadMap() {
  return (
    <>
      <p className="text-roadmap">
        Retrouve ici les oeuvres street art de la MEL
      </p>
      <div className="carte">
        <MapContainer className="map" center={[50.632557, 3.065451]} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[50.632557, 3.065451]}>
            <Popup>
              Lille, France
              <br /> Ici, c'est le centre.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
}

export default RoadMap;
