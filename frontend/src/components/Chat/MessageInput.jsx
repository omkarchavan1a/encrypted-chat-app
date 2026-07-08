import React, { useState, useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import { encryptMessage } from '../../services/encryption';
import './Chat.css';

const MessageInput = ({ recipientPublicKey, recipientId }) => {
  const [message, setMessage] = useState('');
  const { socket } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const [isTyping, setIsTyping] = useState(false);

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      socket?.emit('typing', { senderId: user.id, recipientId });

      setTimeout(() => {
        socket?.emit('stop_typing', { senderId: user.id, recipientId });
        setIsTyping(false);
      }, 3000);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!message.trim() || !recipientPublicKey) return;

    try {
      const secretKey = localStorage.getItem(`secret_key_${user.email}`);
      const encryptedContent = encryptMessage(message, recipientPublicKey, secretKey);

      socket?.emit('send_encrypted_message', {
        senderId: user.id,
        recipientId,
        encryptedMessage: encryptedContent,
        senderPublicKey: user.publicKey,
      });

      setMessage('');
      socket?.emit('stop_typing', { senderId: user.id, recipientId });
      setIsTyping(false);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <form onSubmit={handleSend} className="message-input-form">
      <input
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          handleTyping();
        }}
        placeholder="Type a message... (encrypted)"
        className="message-input"
      />
      <button type="submit" className="send-button">
        📤 Send
      </button>
    </form>
  );
};

export default MessageInput;