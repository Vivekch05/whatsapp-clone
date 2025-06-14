import React, { useRef } from 'react';
import ProfilePicture from '../assets/images/profile-pic.jpg';

const defaultAvatar =
  'https://ui-avatars.com/api/?background=random&name=User';

const initialUser = {
    name: 'Vivek',
    profilePic: ProfilePicture,
    email: 'vivek@example.com',
    phone: '+91-1234567890'
};

const UserProfile = ({ user = initialUser, onEdit, onProfilePicChange }) => {
    const fileInputRef = useRef(null);
console.log('UserProfile', user);
    const handlePicClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && onProfilePicChange) {
            const reader = new FileReader();
            reader.onload = (event) => {
                onProfilePicChange(event.target.result); // base64 image string
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="user-profile" style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            padding: 24,
            maxWidth: 320,
            margin: '24px auto',
            textAlign: 'center'
        }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
                <img
                    src={user.profilePic||ProfilePicture}
                    alt={user.name}
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #eee',
                        cursor: 'pointer'
                    }}
                    onClick={handlePicClick}
                    title="Click to change profile picture"
                />
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <span
                    style={{
                        position: 'absolute',
                        bottom: 4,
                        right: 4,
                        background: '#25d366',
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: 16,
                        cursor: 'pointer',
                        border: '2px solid #fff'
                    }}
                    onClick={handlePicClick}
                    title="Edit"
                >✎</span>
            </div>
            <h2 style={{ margin: '8px 0 4px', fontSize: 22 }}>{user.name}</h2>
            {user.email && <p style={{ margin: '4px 0', color: '#555' }}>Email: {user.email}</p>}
            {user.phone && <p style={{ margin: '4px 0', color: '#555' }}>Phone: {user.phone}</p>}
            <button
                onClick={onEdit}
                style={{
                    marginTop: 16,
                    padding: '8px 20px',
                    borderRadius: 6,
                    border: 'none',
                    background: '#25d366',
                    color: '#fff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 16,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                }}
            >
                Edit Profile
            </button>
        </div>
    );
};

export default UserProfile;