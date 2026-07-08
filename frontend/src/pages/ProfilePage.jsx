import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserProfile from '../components/Profile/UserProfile';
import './Pages.css';

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="profile-page">
      <button onClick={() => navigate('/')} className="back-button">← Back</button>
      <UserProfile userId={userId} />
      <button onClick={() => navigate(`/chat/${userId}`)} className="message-button">
        💬 Send Message
      </button>
    </div>
  );
};

export default ProfilePage;