import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChatProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/chat/:userId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
            <Route path="/profile/:userId" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          </Routes>
        </ChatProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;