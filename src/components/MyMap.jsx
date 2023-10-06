import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MyMap({ lat, lng }) {
    return (
        <MapContainer center={[lat, lng]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lng]}>
                <Popup>
                    Your computer says you live here. <br /> Unless you`re a
                    liar with a VPN
                </Popup>
            </Marker>
        </MapContainer>
    );
}
