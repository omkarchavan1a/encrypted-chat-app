const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

router.get('/', auth, messageController.getMessages);
router.post('/', auth, messageController.saveMessage);
router.put('/:messageId/read', auth, messageController.markAsRead);

module.exports = router;