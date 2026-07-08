require('dotenv').config();
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/encrypted-chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/messages', require('./routes/messages'));

// Socket.io Event Handling
const activeUsers = new Map();

io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  socket.on('user_online', (userId) => {
    activeUsers.set(userId, socket.id);
    io.emit('user_status_changed', { userId, status: 'online' });
  });

  socket.on('send_encrypted_message', (data) => {
    const { recipientId, encryptedMessage, senderPublicKey } = data;
    const recipientSocketId = activeUsers.get(recipientId);
    
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('receive_encrypted_message', {
        ...data,
        timestamp: new Date(),
      });
    }
  });

  socket.on('typing', (data) => {
    const { recipientId } = data;
    const recipientSocketId = activeUsers.get(recipientId);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('user_typing', { senderId: data.senderId });
    }
  });

  socket.on('stop_typing', (data) => {
    const { recipientId } = data;
    const recipientSocketId = activeUsers.get(recipientId);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('user_stop_typing', { senderId: data.senderId });
    }
  });

  socket.on('disconnect', () => {
    for (let [userId, socketId] of activeUsers.entries()) {
      if (socketId === socket.id) {
        activeUsers.delete(userId);
        io.emit('user_status_changed', { userId, status: 'offline' });
        break;
      }
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});