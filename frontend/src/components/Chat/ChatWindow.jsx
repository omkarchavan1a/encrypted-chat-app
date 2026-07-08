import React, { useState, useEffect, useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import { getMessages } from '../../services/api';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './Chat.css';

const ChatWindow = ({ recipientId, recipientUser }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { socket } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchMessages();
  }, [recipientId]);

  useEffect(() => {
    if (socket) {
      socket.on('receive_encrypted_message', (data) => {
        setMessages(prev => [...prev, data]);
      });

      return () => socket.off('receive_encrypted_message');
    }
  }, [socket]);

  const fetchMessages = async () => {
    try {
      const data = await getMessages(user.id, recipientId);
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading messages...</div>;

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>{recipientUser?.username}</h2>
        <p className="status">{recipientUser?.profile?.status}</p>
      </div>

      <MessageList messages={messages} recipientId={recipientId} />

      <MessageInput recipientPublicKey={recipientUser?.publicKey} recipientId={recipientId} />
    </div>
  );
};

export default ChatWindow;