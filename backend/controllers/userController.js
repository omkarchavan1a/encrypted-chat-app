const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, bio, avatar } = req.body;
    const userId = req.user.userId;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        'profile.bio': bio,
        'profile.avatar': avatar,
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const userId = req.user.userId;

    const user = await User.findByIdAndUpdate(
      userId,
      { 'profile.status': status, lastSeen: new Date() },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};