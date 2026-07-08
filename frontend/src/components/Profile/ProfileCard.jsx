import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const ProfileCard = ({ user, onlineUsers }) => {
  const isOnline = onlineUsers?.has(user._id);

  return (
    <Link to={`/profile/${user._id}`} className="profile-card">
      <div className="card-header">
        <img src={user.profile.avatar} alt={user.username} className="card-avatar" />
        <div className={`online-indicator ${isOnline ? 'online' : 'offline'}`} />
      </div>
      <h3>{user.username}</h3>
      <p className="card-bio">{user.profile.bio || 'No bio'}</p>
      <p className="card-status">{isOnline ? '🟢 Online' : '⚫ Offline'}</p>
    </Link>
  );
};

export default ProfileCard;