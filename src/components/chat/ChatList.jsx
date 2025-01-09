import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const dummyChats = [
  { id: 1, contactId: 'alice', name: 'Alice', lastMessage: 'Hey, how are you?', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), avatar: 'https://via.placeholder.com/50' },
  { id: 2, contactId: 'bob', name: 'Bob', lastMessage: "Let's catch up tomorrow!", timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), avatar: 'https://via.placeholder.com/50' },
  { id: 3, contactId: 'charlie', name: 'Charlie', lastMessage: 'Are you coming to the party?', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), avatar: 'https://via.placeholder.com/50' },
  { id: 4, contactId: 'david', name: 'David', lastMessage: "Don't forget the meeting.", timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), avatar: 'https://via.placeholder.com/50' },
  { id: 5, contactId: 'eve', name: 'Eve', lastMessage: 'Happy Birthday!', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), avatar: 'https://via.placeholder.com/50' },
  { id: 6, contactId: 'frank', name: 'Frank', lastMessage: 'Can you send me the report?', timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), avatar: 'https://via.placeholder.com/50' },
  { id: 7, contactId: 'grace', name: 'Grace', lastMessage: 'Good morning!', timestamp: new Date(Date.now() - 1000 * 60 * 1).toISOString(), avatar: 'https://via.placeholder.com/50' },
  { id: 8, contactId: 'heidi', name: 'Heidi', lastMessage: 'See you soon.', timestamp: new Date(Date.now() - 1000 * 60 * 0.5).toISOString(), avatar: 'https://via.placeholder.com/50' },
  { id: 9, contactId: 'ivan', name: 'Ivan', lastMessage: "What's the plan for today?", timestamp: new Date(Date.now() - 1000 * 60 * 0.25).toISOString(), avatar: 'https://via.placeholder.com/50' },
  { id: 10, contactId: 'judy', name: 'Judy', lastMessage: "Let's go for a walk.", timestamp: new Date(Date.now() - 1000 * 60 * 0.1).toISOString(), avatar: 'https://via.placeholder.com/50' },
];

const ChatList = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const sortedChats = [...dummyChats].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent dark:from-primary-light dark:to-primary">
              Chats
            </h1>
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
                dark:hover:bg-gray-600 transition-all duration-200 text-lg"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium 
                rounded-lg transition-colors duration-200 shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {sortedChats.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No conversations yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedChats.map(chat => (
              <Link 
                key={chat.id}
                to={`/chat/${chat.contactId}`} 
                className="block group"
              >
                <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md 
                  transition-all duration-200 transform hover:-translate-y-0.5">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img 
                        src={chat.avatar} 
                        alt={chat.name} 
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 
                        dark:ring-gray-700"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full 
                        ring-2 ring-white dark:ring-gray-800"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 
                          truncate">{chat.name}</h2>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(chat.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 truncate">{chat.lastMessage}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;