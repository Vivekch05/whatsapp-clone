import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import ChatList from './components/ChatList';
import './assets/styles.css';
import ProfilePicture from './assets/images/profile-pic.jpg';
import { io } from 'socket.io-client';

const initialChats = [
    {
        id: 1,
        name: 'Alice',
        avatar: '',
        messages: [
            { sender: 'Alice', text: 'Hi there!' },
            { sender: 'Vivek', text: 'Hello Alice!' }
        ]
    },
    {
        id: 2,
        name: 'Bob',
        avatar: '',
        messages: [
            { sender: 'Bob', text: 'Hey!' },
            { sender: 'Vivek', text: 'Hey Bob!' }
        ]
    }
];

const initialUser = {
    name: 'Vivek',
    profilePic: ProfilePicture,
    email: 'vivek@example.com',
    phone: '+91-1234567890'
};

const SOCKET_SERVER_URL = "wss://socket-io-chat.now.sh/"; // Public demo server

const App = () => {
    const [chats, setChats] = useState(initialChats);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [user, setUser] = useState(initialUser);
    const socketRef = useRef(null);

    useEffect(() => {
        // Connect to socket server
        socketRef.current = io(SOCKET_SERVER_URL);

        // Listen for incoming messages
        socketRef.current.on('chat message', ({ chatId, sender, text }) => {
            setChats(prevChats =>
                prevChats.map(chat =>
                    chat.id === chatId
                        ? {
                            ...chat,
                            messages: [...chat.messages, { sender, text }]
                        }
                        : chat
                )
            );
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const handleChatSelect = (chat) => {
        setSelectedChatId(chat.id);
    };

    const handleSendMessage = (message) => {
        if (!selectedChatId) return;
        // Emit message to socket server
        socketRef.current.emit('chat message', {
            chatId: selectedChatId,
            sender: user.name,
            text: message
        });
        // Optimistically update UI
        setChats(prevChats =>
            prevChats.map(chat =>
                chat.id === selectedChatId
                    ? {
                        ...chat,
                        messages: [...chat.messages, { sender: user.name, text: message }]
                    }
                    : chat
            )
        );
    };

    const handleUpdateUser = (updatedUser) => {
        setUser(updatedUser);
    };

    return (
        <div className="app-container">
            <Sidebar
                user={user}
                chats={chats}
                onSelectChat={handleChatSelect}
                selectedChatId={selectedChatId}
                onUpdateUser={handleUpdateUser}
                onProfilePicChange={newPic => setUser({ ...user, profilePic: newPic })}
            />
            <div className="main-chat-area">
                {selectedChatId ? (
                    <ChatWindow
                        chat={chats.find(c => c.id === selectedChatId)}
                        onSendMessage={handleSendMessage}
                    />
                ) : (
                    <ChatList
                        chats={chats}
                        onChatSelect={handleChatSelect}
                        selectedChatId={null}
                    />
                )}
            </div>
        </div>
    );
};

export default App;