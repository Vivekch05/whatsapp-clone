import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import ChatList from './components/ChatList';
import ProfilePicture from './assets/images/profile-pic.jpg';
import './assets/styles.css';

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

const App = () => {
    const [chats, setChats] = useState(initialChats);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [user, setUser] = useState(initialUser);

    const handleChatSelect = (chat) => {
        setSelectedChatId(chat.id);
    };

    const handleSendMessage = (message) => {
        if (!selectedChatId) return;
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
                onProfilePicChange={newPic => setUser({ ...user, profilePic: newPic|| ProfilePicture })}
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