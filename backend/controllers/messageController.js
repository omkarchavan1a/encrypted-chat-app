const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
  try {
    const { userId, recipientId } = req.query;

    const messages = await Message.find({
      $or: [
        { senderId: userId, recipientId: recipientId },
        { senderId: recipientId, recipientId: userId },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveMessage = async (req, res) => {
  try {
    const { senderId, recipientId, encryptedContent, senderPublicKey } = req.body;

    const message = new Message({
      senderId,
      recipientId,
      encryptedContent,
      senderPublicKey,
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findByIdAndUpdate(
      messageId,
      { readAt: new Date() },
      { new: true }
    );

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};