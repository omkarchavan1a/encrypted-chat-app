import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../services/api';
import ChatWindow from '../components/Chat/ChatWindow';
import './Pages.css';

const ChatPage = () => {
  const { userId } = useParams();
  const [recipientUser, setRecipientUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const user = await getUserById(userId);
      setRecipientUser(user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading chat...</div>;
  if (!recipientUser) return <div className="error">User not found</div>;

  return (
    <div className="chat-page">
      <button onClick={() => navigate('/')} className="back-button">← Back</button>
      <ChatWindow recipientId={userId} recipientUser={recipientUser} />
    </div>
  );
};

export default ChatPage;