import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { getUsers } from '../services/api';
import ProfileCard from '../components/Profile/ProfileCard';
import './Pages.css';

const HomePage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);
  const { onlineUsers } = useContext(ChatContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      setAllUsers(users.filter(u => u._id !== user.id));
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="home-page">
      <header className="app-header">
        <h1>🔐 Encrypted Chat</h1>
        <div className="header-actions">
          <Link to="/" className="profile-link">{user?.username}</Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>

      <div className="home-container">
        <h2>Start a Conversation</h2>
        {loading ? (
          <div className="loading">Loading users...</div>
        ) : (
          <div className="users-grid">
            {allUsers.map(otherUser => (
              <Link
                key={otherUser._id}
                to={`/chat/${otherUser._id}`}
                className="user-link"
              >
                <ProfileCard user={otherUser} onlineUsers={onlineUsers} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;