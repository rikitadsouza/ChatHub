import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const initialMessages = {
  alice: [
    { senderId: 'user1', content: 'Hey, how are you?', timestamp: new Date().toISOString() },
    { senderId: 'alice', content: 'I am good, thanks!', timestamp: new Date().toISOString() },
  ],
  bob: [
    { senderId: 'user1', content: "Let's catch up tomorrow!", timestamp: new Date().toISOString() },
    { senderId: 'bob', content: 'Sure, see you then!', timestamp: new Date().toISOString() },
  ],
  charlie: [
    { senderId: 'user1', content: 'Are you coming to the party?', timestamp: new Date().toISOString() },
    { senderId: 'charlie', content: 'Yes, I will be there!', timestamp: new Date().toISOString() },
  ],
  david: [
    { senderId: 'user1', content: "Don't forget the meeting.", timestamp: new Date().toISOString() },
    { senderId: 'david', content: "I won't, thanks!", timestamp: new Date().toISOString() },
  ],
  eve: [
    { senderId: 'user1', content: 'Happy Birthday!', timestamp: new Date().toISOString() },
    { senderId: 'eve', content: 'Thank you!', timestamp: new Date().toISOString() },
  ],
  frank: [
    { senderId: 'user1', content: 'Can you send me the report?', timestamp: new Date().toISOString() },
    { senderId: 'frank', content: 'Sure, I will send it by EOD.', timestamp: new Date().toISOString() },
  ],
  grace: [
    { senderId: 'user1', content: 'Good morning!', timestamp: new Date().toISOString() },
    { senderId: 'grace', content: 'Good morning to you too!', timestamp: new Date().toISOString() },
  ],
  heidi: [
    { senderId: 'user1', content: 'See you soon.', timestamp: new Date().toISOString() },
    { senderId: 'heidi', content: 'See you!', timestamp: new Date().toISOString() },
  ],
  ivan: [
    { senderId: 'user1', content: "What's the plan for today?", timestamp: new Date().toISOString() },
    { senderId: 'ivan', content: "Let's discuss it over lunch.", timestamp: new Date().toISOString() },
  ],
  judy: [
    { senderId: 'user1', content: "Let's go for a walk.", timestamp: new Date().toISOString() },
    { senderId: 'judy', content: 'Sounds good!', timestamp: new Date().toISOString() },
  ],
};

const ChatRoom = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(initialMessages[contactId] || []);

  useEffect(() => {
    setMessages(initialMessages[contactId] || []);
  }, [contactId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        senderId: 'user1',
        content: message,
        timestamp: new Date().toISOString(),
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      initialMessages[contactId] = updatedMessages;
      setMessage('');
    }
  };

  const handleBackToChatList = () => {
    navigate('/chats');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackToChatList}
              className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200 shadow-sm"
            >
              Back
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <span className="text-lg font-semibold text-primary">
                  {contactId.charAt(0).toUpperCase()}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {contactId.charAt(0).toUpperCase() + contactId.slice(1)}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.senderId === 'user1' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`relative max-w-xl px-6 py-4 rounded-2xl shadow-sm
                  ${msg.senderId === 'user1' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
                  }`}
              >
                <p className="text-base">{msg.content}</p>
                <p 
                  className={`text-xs mt-2 
                    ${msg.senderId === 'user1' 
                      ? 'text-primary-50' 
                      : 'text-gray-500 dark:text-gray-400'
                    }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-4">
        <div className="max-w-6xl mx-auto flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-0 
              focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white 
              dark:focus:ring-offset-gray-800 dark:text-gray-200 placeholder-gray-500 
              dark:placeholder-gray-400 transition-all duration-200"
            placeholder="Type a message"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg 
              hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 
              focus:ring-offset-white dark:focus:ring-offset-gray-800 
              disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;