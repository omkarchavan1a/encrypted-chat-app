import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { initializeSocket } from '../services/socket';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [typing, setTyping] = useState(null);

  useEffect(() => {
    if (user && token) {
      const newSocket = initializeSocket(token);
      setSocket(newSocket);

      newSocket.emit('user_online', user.id);

      newSocket.on('user_status_changed', ({ userId, status }) => {
        setOnlineUsers(prev => {
          const updated = new Set(prev);
          if (status === 'online') updated.add(userId);
          else updated.delete(userId);
          return updated;
        });
      });

      newSocket.on('user_typing', ({ senderId }) => {
        setTyping(senderId);
      });

      newSocket.on('user_stop_typing', () => {
        setTyping(null);
      });

      return () => newSocket.disconnect();
    }
  }, [user, token]);

  return (
    <ChatContext.Provider value={{
      messages,
      setMessages,
      users,
      setUsers,
      activeChat,
      setActiveChat,
      socket,
      onlineUsers,
      typing,
    }}>
      {children}
    </ChatContext.Provider>
  );
};