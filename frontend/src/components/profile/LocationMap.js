import Modal from "../modal/Modal";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const LocationMap = (props) => {
  return (
    <Modal onCloseModal={props.onCloseModal}>
      <MapContainer center={[props.lat, props.lon]} zoom={11} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[props.lat, props.lon]}>
          <Popup>
            {props.location}
          </Popup>
        </Marker>
      </MapContainer>
    </Modal>
  );
};

export default LocationMap;
