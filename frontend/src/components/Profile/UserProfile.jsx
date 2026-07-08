import React, { useState, useEffect } from 'react';
import { getUserById } from '../../services/api';
import './Profile.css';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const data = await getUserById(userId);
      setUser(data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading profile...</div>;
  if (!user) return <div className="error">User not found</div>;

  return (
    <div className="user-profile">
      <img src={user.profile.avatar} alt={user.username} className="profile-avatar" />
      <h1>{user.username}</h1>
      <p className="user-email">{user.email}</p>
      <p className="user-bio">{user.profile.bio || 'No bio yet'}</p>
      <div className="user-status">
        <span className={`status-badge ${user.profile.status}`}>
          {user.profile.status}
        </span>
        <span className="last-seen">
          Last seen: {new Date(user.lastSeen).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default UserProfile;