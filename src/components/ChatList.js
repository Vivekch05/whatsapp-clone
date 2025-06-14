import React from 'react';

const defaultAvatar =
  'https://ui-avatars.com/api/?background=random&name=User';

const ChatList = ({ chats, onChatSelect, selectedChatId }) => {
    return (
        <div className="chat-list" style={{
            width: '100%',
            maxWidth: 350,
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            margin: '24px auto',
            overflow: 'hidden'
        }}>
            <div style={{
                padding: '18px 20px',
                borderBottom: '1px solid #eee',
                background: '#f5f5f5',
                fontWeight: 600,
                fontSize: 18,
                letterSpacing: 0.2,
                textAlign: 'center'
            }}>
                Chats
            </div>
            {chats && chats.length > 0 ? (
                chats.map(chat => {
                    const lastMsg =
                        chat.messages && chat.messages.length > 0
                            ? chat.messages[chat.messages.length - 1].text
                            : 'No messages yet';
                    return (
                        <div
                            key={chat.id}
                            className={`chat-item${selectedChatId === chat.id ? ' selected' : ''}`}
                            onClick={() => onChatSelect(chat)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '14px 16px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #f0f0f0',
                                background: selectedChatId === chat.id ? '#e7fbe9' : 'transparent',
                                transition: 'background 0.2s',
                            }}
                        >
                            <img
                                src={chat.avatar || defaultAvatar}
                                alt={chat.name}
                                className="chat-avatar"
                                style={{
                                    borderRadius: '50%',
                                    width: 44,
                                    height: 44,
                                    objectFit: 'cover',
                                    marginRight: 14,
                                    border: '1px solid #eee'
                                }}
                            />
                            <div className="chat-info" style={{ flex: 1 }}>
                                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>{chat.name}</h3>
                                <p style={{
                                    margin: 0,
                                    color: '#888',
                                    fontSize: 13,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {lastMsg}
                                </p>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div style={{ color: '#aaa', textAlign: 'center', padding: 24 }}>No chats available.</div>
            )}
        </div>
    );
};

export default ChatList;