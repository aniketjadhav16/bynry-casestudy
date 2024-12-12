import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const handleAdminClick = () => {
        navigate("/admin");
    };

    const handleGuestClick = () => {
        navigate("/profilespage");
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f7f9fc',
        margin: 0,
    };

    const cardStyle = {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        textAlign: 'center',
        width: '300px',
    };

    const headingStyle = {
        fontSize: '24px',
        marginBottom: '20px',
        color: 'black',
        fontWeight: 'bold'
    };

    const buttonStyle = {
        backgroundColor: '#000000',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
        fontSize: '16px',
        width: '100%',
        marginBottom: '10px',
    };

    const guestButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#ffffff',
        color: 'black',
        border: '1px solid #000000',
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h2 style={headingStyle}>Login as</h2>
                <button style={buttonStyle} onClick={handleAdminClick}>
                    Admin
                </button>
                <h3>or</h3>
                <button style={guestButtonStyle} onClick={handleGuestClick}>
                    Guest
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
