import React, { useState } from "react";
import MapComponent from "./MapComponent";
import { Link } from "react-router-dom";

const ProfileCard = ({ profile }) => {
    const [showMap, setShowMap] = useState(false);

    const handleSummaryClick = () => {
        setShowMap(!showMap);
    };

    return (
        <div className="profile-card">
            <div>
                <img src={profile.photo} alt={profile.name} />
            </div>
            <div>
                <h2>{profile.name}</h2>
                <p>{profile.description}</p>
            </div>
            <div className="button-group">
                <button onClick={handleSummaryClick}>
                    {showMap ? "Close Map" : "Show Map"}
                </button>
                <Link to={`/profiles/${profile.id}`} state={{ profile }}>
                    <button>View Details</button>
                </Link>
            </div>
            {showMap && (
                <div className="map-container">
                    <MapComponent
                        latitude={profile.latitude}
                        longitude={profile.longitude}
                        markerLabel={profile.name}
                    />
                </div>
            )}
        </div>
    );
};

export default ProfileCard;

