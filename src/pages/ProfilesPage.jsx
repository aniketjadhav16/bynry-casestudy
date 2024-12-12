import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import axios from "axios";

const ProfilesPage = () => {
    const [profiles, setProfiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get('/src/profile-details/profiles.json')
            .then((response) => {
                setProfiles(response.data || []);
                setFilteredProfiles(response.data || []);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching profiles:", error);
                setIsLoading(false);
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchClick = () => {
        setFilteredProfiles(
            profiles.filter((profile) => {
                const searchTerm = searchQuery.toLowerCase();
                return (
                    profile.name.toLowerCase().includes(searchTerm) ||
                    profile.description.toLowerCase().includes(searchTerm) ||
                    profile.interests.toLowerCase().includes(searchTerm)
                );
            })
        );
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Profiles</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name, description, or interests"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button onClick={handleSearchClick}>Search</button>
            </div>
            <div className="profile-grid">
                {filteredProfiles.length > 0 ? (
                    filteredProfiles.map((profile) => (
                        <ProfileCard key={profile.id} profile={profile} />
                    ))
                ) : (
                    <p>No profiles found matching your criteria!</p>
                )}
            </div>
        </div>
    );
};

export default ProfilesPage;

