const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API error');
  }

  return response.json();
};

export const signup = (username, email, password, publicKey) =>
  apiCall('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ username, email, password, publicKey }),
  });

export const login = (email, password) =>
  apiCall('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const getUsers = () =>
  apiCall('/api/users');

export const getUserById = (userId) =>
  apiCall(`/api/users/${userId}`);

export const getMessages = (userId, recipientId) =>
  apiCall(`/api/messages?userId=${userId}&recipientId=${recipientId}`);

export const saveMessage = (senderId, recipientId, encryptedContent, senderPublicKey) =>
  apiCall('/api/messages', {
    method: 'POST',
    body: JSON.stringify({ senderId, recipientId, encryptedContent, senderPublicKey }),
  });

export const updateProfile = (username, bio, avatar) =>
  apiCall('/api/users/profile', {
    method: 'PUT',
    body: JSON.stringify({ username, bio, avatar }),
  });