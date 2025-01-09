// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Login from './components/auth/Login';
import ChatList from './components/chat/ChatList';
import ChatRoom from './components/chat/ChatRoom';
import { useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <Router>
      <AuthProvider>
        <ChatProvider>
          <div className={`h-screen w-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/chats"
                element={
                  <PrivateRoute>
                    <ChatList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/chat/:contactId"
                element={
                  <PrivateRoute>
                    <ChatRoom />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </ChatProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;