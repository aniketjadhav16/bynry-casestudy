import React from "react";
import { useLocation } from "react-router-dom";

const Details = () => {
    const location = useLocation();
    const profile = location.state?.profile;

    if (!profile) {
        return <p>Profile not found!</p>;
    }

    return (
        <div className="container">
            <h1>{profile.name}</h1>
            <img src={profile.photo} alt={profile.name} />
            <p>{profile.description}</p>
            <p><strong>Contact:</strong> {profile.contact}</p>
            <p><strong>Interests:</strong> {profile.interests}</p>
            <p><strong>Location:</strong> {profile.latitude}, {profile.longitude}</p>
        </div>
    );
};

export default Details;

