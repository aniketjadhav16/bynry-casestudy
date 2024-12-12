import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProfilePage = () => {
    const [profiles, setProfiles] = useState([]);
    const [form, setForm] = useState({
        id: "",
        name: "",
        photo: "",
        description: "",
        latitude: "",
        longitude: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get('src/profile-details/profiles.json')
            .then((response) => {
                setProfiles(response.data || []);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching profiles:", error);
                setIsLoading(false);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (editMode) {
            setProfiles((prevProfiles) =>
                prevProfiles.map((profile) =>
                    profile.id === form.id ? { ...form } : profile
                )
            );
            setEditMode(false);
        } else {
            setProfiles((prevProfiles) => [
                ...prevProfiles,
                { ...form, id: new Date().getTime().toString() },
            ]);
        }

        setForm({
            id: "",
            name: "",
            photo: "",
            description: "",
            latitude: "",
            longitude: "",
        });
    };

    const handleEdit = (profile) => {
        setForm(profile);
        setEditMode(true);
    };

    const handleDelete = (id) => {
        setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== id));
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
            <h1>Admin Profile Management</h1>
            <div>
                <h2>{editMode ? "Edit Profile" : "Add New Profile"}</h2>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Photo URL:</label>
                        <input
                            type="text"
                            name="photo"
                            value={form.photo}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Latitude:</label>
                        <input
                            type="number"
                            name="latitude"
                            value={form.latitude}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Longitude:</label>
                        <input
                            type="number"
                            name="longitude"
                            value={form.longitude}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">{editMode ? "Update Profile" : "Add Profile"}</button>
                </form>
            </div>

            <div>
                <h2>Existing Profiles</h2>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Photo</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(profiles) && profiles.length > 0 ? (
                            profiles.map((profile) => (
                                <tr key={profile.id}>
                                    <td>{profile.name}</td>
                                    <td>
                                        <img
                                            src={profile.photo}
                                            alt={profile.name}
                                            width="50"
                                            height="50"
                                        />
                                    </td>
                                    <td>{profile.description}</td>
                                    <td>
                                        <button onClick={() => handleEdit(profile)}>Edit</button>
                                        <button onClick={() => handleDelete(profile.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No profiles found!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProfilePage;

