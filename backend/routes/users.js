const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/', auth, userController.getAllUsers);
router.get('/:userId', auth, userController.getUserById);
router.put('/profile', auth, userController.updateProfile);
router.put('/status', auth, userController.updateStatus);

module.exports = router;