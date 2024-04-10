import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "./Pin";

function Map({ items }) {
    return (
        <div className="h-full w-full">
            <MapContainer
                center={
                    items.length === 1
                        ? [items[0].latitude, items[0].longitude]
                        : [52.4797, -1.90269]
                }
                zoom={7}
                scrollWheelZoom={false}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {items.map((item) => (
                    <Pin item={item} key={item.id} />
                ))}
            </MapContainer>
        </div>
    );
}

export default Map;
