import React, { useState } from 'react';
import UserProfile from './UserProfile';
import EditProfileModal from './EditProfileModal';

const defaultAvatar =
    'https://ui-avatars.com/api/?background=random&name=User';

const Sidebar = ({ user, chats, onSelectChat, selectedChatId, onUpdateUser,onProfilePicChange }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="sidebar">
            <UserProfile user={user} onEdit={() => setShowModal(true)} onProfilePicChange={onProfilePicChange}  />
            {showModal && (
                <EditProfileModal
                    user={user}
                    onClose={() => setShowModal(false)}
                    onSave={onUpdateUser}
                />
            )}
            <div className="chat-list">
                {chats.map(chat => {
                    const lastMsg =
                        chat.messages && chat.messages.length > 0
                            ? chat.messages[chat.messages.length - 1].text
                            : 'No messages yet';
                    return (
                        <div
                            key={chat.id}
                            className={`chat-item${selectedChatId === chat.id ? ' selected' : ''}`}
                            onClick={() => onSelectChat(chat)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '10px 8px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #eee',
                                background: selectedChatId === chat.id ? '#e7fbe9' : 'transparent',
                                transition: 'background 0.2s',
                            }}
                        >
                            <img
                                src={chat.avatar || defaultAvatar}
                                alt={chat.name}
                                className="chat-avatar"
                                style={{ borderRadius: '50%', width: 40, height: 40, objectFit: 'cover', marginRight: 12 }}
                            />
                            <div className="chat-info" style={{ flex: 1 }}>
                                <h3 style={{ margin: 0, fontSize: 16 }}>{chat.name}</h3>
                                <p style={{ margin: 0, color: '#888', fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {lastMsg}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;