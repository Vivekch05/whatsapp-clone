import React, { useState, useRef } from 'react';

const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    const inputRef = useRef(null);

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
            inputRef.current && inputRef.current.focus();
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            handleSubmit(event);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="message-input"
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                borderTop: '1px solid #eee',
                background: '#fafafa'
            }}
        >
            <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="input-field"
                style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: 20,
                    border: '1px solid #ddd',
                    outline: 'none',
                    fontSize: 16,
                    marginRight: 10,
                    background: '#fff'
                }}
                autoFocus
                autoComplete="off"
            />
            <button
                type="submit"
                className="send-button"
                style={{
                    background: message.trim() ? '#25d366' : '#bdbdbd',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 20,
                    padding: '8px 22px',
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: message.trim() ? 'pointer' : 'not-allowed',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    transition: 'background 0.2s'
                }}
                disabled={!message.trim()}
            >
                Send
            </button>
        </form>
    );
};

export default MessageInput;