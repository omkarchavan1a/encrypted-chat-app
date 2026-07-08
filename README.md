# 🔐 Encrypted Chat Application

A privacy-first real-time chat application with end-to-end encryption using TweetNaCl.js (like Telegram).

## Features

✅ **End-to-End Encryption** - All messages encrypted using TweetNaCl.js
✅ **Real-time Messaging** - Instant message delivery with Socket.io
✅ **User Authentication** - Secure JWT-based authentication
✅ **User Profiles** - Customizable profiles with avatars and bio
✅ **Online/Offline Status** - Real-time presence tracking
✅ **Typing Indicators** - Know when someone is typing
✅ **Message Read Receipts** - Track message delivery
✅ **Privacy First** - Messages encrypted on client-side, server never sees plaintext
✅ **Beautiful UI** - Modern gradient design with responsive layout
✅ **2-User Communication** - Perfect for private conversations

## Tech Stack

### Backend
- Node.js + Express
- MongoDB
- Socket.io (WebSocket)
- TweetNaCl.js (Encryption)
- JWT Authentication
- Bcrypt (Password hashing)

### Frontend
- React 18
- Vite
- React Router
- Socket.io Client
- TweetNaCl.js (Encryption)
- Modern CSS with Flexbox/Grid

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/encrypted-chat
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=3001
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Run the server:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:
```
VITE_API_URL=http://localhost:3001
```

Run the development server:
```bash
npm run dev
```

Access the app: `http://localhost:5173`

## How It Works

### Encryption Flow

1. **Key Generation**: When a user signs up, a public/private key pair is generated using TweetNaCl.js
2. **Key Storage**: Public key is stored on server, private key is stored locally in localStorage
3. **Message Encryption**: Before sending a message, it's encrypted using recipient's public key
4. **Message Transmission**: Encrypted message is sent to server and relayed to recipient
5. **Message Decryption**: Recipient decrypts using sender's public key and their own private key

### Security Features

- **Perfect Forward Secrecy**: Each message uses a random nonce
- **Client-Side Encryption**: Server never sees plaintext messages
- **Secure Password Storage**: Passwords hashed with bcrypt
- **JWT Tokens**: Secure session management
- **CORS Protection**: Configured for development and production

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:userId` - Get user by ID
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/status` - Update user status

### Messages
- `GET /api/messages` - Get messages between users
- `POST /api/messages` - Save encrypted message
- `PUT /api/messages/:messageId/read` - Mark message as read

## Socket.io Events

### Client → Server
- `user_online` - User comes online
- `send_encrypted_message` - Send encrypted message
- `typing` - User is typing
- `stop_typing` - User stopped typing

### Server → Client
- `user_status_changed` - User's online status changed
- `receive_encrypted_message` - Receive encrypted message
- `user_typing` - User is typing
- `user_stop_typing` - User stopped typing

## Usage

1. **Sign Up**: Create an account with email and password
2. **View Users**: See all available users on home page
3. **Start Chat**: Click on a user to start encrypted conversation
4. **Send Messages**: Messages are automatically encrypted before sending
5. **View Profile**: Click on username to see profile details

## Security Considerations

⚠️ **Important Notes for Production**:
- Store private keys securely (not just localStorage)
- Implement HTTPS/TLS for all connections
- Use environment variables for sensitive data
- Add rate limiting to API endpoints
- Implement message deletion/expiration
- Add 2FA authentication
- Use secure WebSocket (WSS)
- Implement CORS properly
- Add input validation and sanitization
- Regular security audits

## Contributing

Feel free to fork and submit pull requests for any improvements!

## License

MIT License - feel free to use this in your projects

---

**Built with ❤️ for privacy**