import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { decryptMessage } from '../../services/encryption';
import './Chat.css';

const MessageList = ({ messages, recipientId }) => {
  const { user } = useContext(AuthContext);

  const decryptedMessages = messages.map(msg => {
    try {
      const secretKey = localStorage.getItem(`secret_key_${user.email}`);
      const decryptedContent = decryptMessage(msg.encryptedContent, msg.senderPublicKey, secretKey);
      return { ...msg, content: decryptedContent };
    } catch (error) {
      return { ...msg, content: '[Failed to decrypt]' };
    }
  });

  return (
    <div className="message-list">
      {decryptedMessages.map((msg) => (
        <div key={msg._id} className={`message ${msg.senderId === user.id ? 'sent' : 'received'}`}>
          <div className="message-content">{msg.content}</div>
          <div className="message-time">
            {new Date(msg.createdAt).toLocaleTimeString()}
            {msg.readAt && ' ✓✓'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;