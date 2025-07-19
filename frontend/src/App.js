import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Send, 
  Smile, 
  Paperclip, 
  Mic, 
  ArrowLeft,
  MessageCircle,
  Users,
  Settings,
  Archive,
  Star,
  Camera,
  Plus,
  X,
  Check,
  CheckCheck,
  Clock
} from 'lucide-react';

// Mock data for WhatsApp clone
const mockChats = [
  {
    id: 1,
    name: "Mom",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9b2d3ad?w=150",
    lastMessage: "Don't forget to call me later!",
    time: "2:30 PM",
    unreadCount: 2,
    isOnline: true,
    messages: [
      { id: 1, text: "Hey honey, how was your day?", time: "2:15 PM", sent: false, status: "read" },
      { id: 2, text: "It was great mom! Just finished work", time: "2:20 PM", sent: true, status: "read" },
      { id: 3, text: "That's wonderful to hear", time: "2:25 PM", sent: false, status: "read" },
      { id: 4, text: "Don't forget to call me later!", time: "2:30 PM", sent: false, status: "delivered" }
    ]
  },
  {
    id: 2,
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    lastMessage: "Sure, let's meet at 5 PM",
    time: "1:45 PM",
    unreadCount: 0,
    isOnline: false,
    messages: [
      { id: 1, text: "Hey! Want to grab coffee later?", time: "1:30 PM", sent: true, status: "read" },
      { id: 2, text: "Sure, let's meet at 5 PM", time: "1:45 PM", sent: false, status: "read" }
    ]
  },
  {
    id: 3,
    name: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    lastMessage: "Thanks for the documents!",
    time: "12:30 PM",
    unreadCount: 0,
    isOnline: true,
    messages: [
      { id: 1, text: "Can you send me the project files?", time: "12:00 PM", sent: false, status: "read" },
      { id: 2, text: "Sure! Here they are", time: "12:15 PM", sent: true, status: "read" },
      { id: 3, text: "Thanks for the documents!", time: "12:30 PM", sent: false, status: "delivered" }
    ]
  },
  {
    id: 4,
    name: "Work Group",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150",
    lastMessage: "Meeting at 3 PM tomorrow",
    time: "11:15 AM",
    unreadCount: 5,
    isOnline: false,
    isGroup: true,
    messages: [
      { id: 1, text: "Team meeting tomorrow", time: "11:00 AM", sent: false, status: "read", sender: "Alex" },
      { id: 2, text: "What time?", time: "11:05 AM", sent: true, status: "read" },
      { id: 3, text: "Meeting at 3 PM tomorrow", time: "11:15 AM", sent: false, status: "delivered", sender: "Alex" }
    ]
  },
  {
    id: 5,
    name: "Mike Johnson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    lastMessage: "Let's catch up soon!",
    time: "Yesterday",
    unreadCount: 0,
    isOnline: false,
    messages: [
      { id: 1, text: "How have you been?", time: "Yesterday", sent: false, status: "read" },
      { id: 2, text: "I'm doing well, thanks for asking!", time: "Yesterday", sent: true, status: "read" },
      { id: 3, text: "Let's catch up soon!", time: "Yesterday", sent: false, status: "read" }
    ]
  }
];

const mockStatus = [
  {
    id: 1,
    name: "My Status",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    time: "2 hours ago",
    isOwn: true,
    stories: [
      { id: 1, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400", time: "2 hours ago" }
    ]
  },
  {
    id: 2,
    name: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    time: "1 hour ago",
    isOwn: false,
    stories: [
      { id: 1, image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400", time: "1 hour ago" }
    ]
  }
];

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [currentView, setCurrentView] = useState('chats'); // chats, status, calls, settings
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMessageStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return <Clock className="w-3 h-3 text-gray-400" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-96 bg-white border-r border-gray-200 flex flex-col"
      >
        {/* Header */}
        <div className="bg-[#00a884] text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold">WhatsApp</h1>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Camera className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search or start new chat"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg placeholder-white/70 text-white border-none outline-none focus:bg-white/20 transition-all"
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-white border-b border-gray-200">
          {[
            { id: 'chats', icon: MessageCircle, label: 'Chats' },
            { id: 'status', icon: Camera, label: 'Status' },
            { id: 'calls', icon: Phone, label: 'Calls' },
            { id: 'settings', icon: Settings, label: 'Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentView(tab.id)}
              className={`flex-1 flex flex-col items-center py-3 transition-colors ${
                currentView === tab.id 
                  ? 'text-[#00a884] border-b-2 border-[#00a884]' 
                  : 'text-gray-600 hover:text-[#00a884]'
              }`}
            >
              <tab.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Chat List */}
        {currentView === 'chats' && (
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <motion.div
                key={chat.id}
                whileHover={{ backgroundColor: '#f5f5f5' }}
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center p-4 cursor-pointer transition-colors ${
                  selectedChat?.id === chat.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    {chat.unreadCount > 0 && (
                      <span className="bg-[#00a884] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Status List */}
        {currentView === 'status' && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-6">
              <h3 className="text-gray-600 font-medium mb-4">Recent updates</h3>
              {mockStatus.map((status) => (
                <div key={status.id} className="flex items-center mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <div className="relative">
                    <img
                      src={status.avatar}
                      alt={status.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#00a884] p-0.5"
                    />
                    {status.isOwn && (
                      <div className="absolute bottom-0 right-0 bg-[#00a884] rounded-full p-1">
                        <Plus className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900">{status.name}</h4>
                    <p className="text-sm text-gray-500">{status.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Views */}
        {(currentView === 'calls' || currentView === 'settings') && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-6xl mb-4">
                {currentView === 'calls' ? '📞' : '⚙️'}
              </div>
              <p className="text-lg font-medium">
                {currentView === 'calls' ? 'Calls' : 'Settings'}
              </p>
              <p className="text-sm">Feature coming soon...</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gray-100 border-b border-gray-200 p-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <button 
                  onClick={() => setSelectedChat(null)}
                  className="mr-3 p-2 hover:bg-gray-200 rounded-full transition-colors lg:hidden"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <img
                  src={selectedChat.avatar}
                  alt={selectedChat.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedChat.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedChat.isOnline ? 'Online' : 'Last seen recently'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <Phone className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <Video className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </motion.div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#efeae2]" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%23f7f3f0' fill-opacity='0.4'%3E%3Cpolygon points='0 40 40 0 40 40'/%3E%3C/g%3E%3C/svg%3E")` 
            }}>
              <AnimatePresence>
                {selectedChat.messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className={`mb-4 flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg relative ${
                      msg.sent 
                        ? 'bg-[#dcf8c6] text-gray-800' 
                        : 'bg-white text-gray-800'
                    } shadow-sm`}>
                      {selectedChat.isGroup && !msg.sent && (
                        <p className="text-xs text-[#00a884] font-medium mb-1">{msg.sender}</p>
                      )}
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <div className="flex items-center justify-end mt-1 space-x-1">
                        <span className="text-xs text-gray-500">{msg.time}</span>
                        {msg.sent && getMessageStatusIcon(msg.status)}
                      </div>
                      {/* Message tail */}
                      <div className={`absolute top-0 w-0 h-0 ${
                        msg.sent 
                          ? 'right-0 border-l-8 border-l-[#dcf8c6] border-t-8 border-t-transparent' 
                          : 'left-0 border-r-8 border-r-white border-t-8 border-t-transparent'
                      }`}></div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gray-100 p-4"
            >
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <button type="button" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <Smile className="w-6 h-6 text-gray-600" />
                </button>
                <button type="button" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <Paperclip className="w-6 h-6 text-gray-600" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-[#00a884] transition-colors"
                  />
                </div>
                {message.trim() ? (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    className="p-2 bg-[#00a884] hover:bg-[#00a884]/90 rounded-full transition-colors"
                  >
                    <Send className="w-6 h-6 text-white" />
                  </motion.button>
                ) : (
                  <button type="button" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                    <Mic className="w-6 h-6 text-gray-600" />
                  </button>
                )}
              </form>
            </motion.div>
          </>
        ) : (
          <div className="flex-1 bg-gray-50 flex items-center justify-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-8xl mb-6">💬</div>
              <h2 className="text-2xl font-light text-gray-800 mb-2">WhatsApp Web</h2>
              <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                Send and receive messages without keeping your phone online.
                Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;