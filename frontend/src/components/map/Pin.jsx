import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

function Pin({ item }) {
    return (
        <Marker position={[item.latitude, item.longitude]}>
            <Popup>
                <div className="popupContainer">
                    <img src={item.images[0]} alt="" />
                    <div className="textContainer">
                        <Link to={`/${item.id}`}>{item.name}</Link>
                        <span>{item.price} $</span>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
}

export default Pin;