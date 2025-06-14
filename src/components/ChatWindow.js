import React, { useRef, useEffect } from 'react';
import MessageInput from './MessageInput';

const ChatWindow = ({ chat, onSendMessage }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chat]);

    if (!chat) {
        return (
            <div className="chat-window" style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#888',
                fontSize: 18,
                background: '#f7f7f7',
                borderRadius: 12,
                margin: 24,
            }}>
                Select a chat to start messaging
            </div>
        );
    }

    return (
        <div className="chat-window">
            <div className="chat-header">{chat.name}</div>
            <div className="chat-messages">
                {chat.messages && chat.messages.length > 0 ? (
                    chat.messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`message-bubble ${msg.sender === chat.name ? 'received' : 'sent'}`}
                        >
                            <span style={{ fontWeight: 500 }}>{msg.sender}:</span> {msg.text}
                        </div>
                    ))
                ) : (
                    <div style={{ color: '#aaa', textAlign: 'center' }}>No messages yet.</div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <MessageInput onSendMessage={onSendMessage} />
        </div>
    );
};

export default ChatWindow;