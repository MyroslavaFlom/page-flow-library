const router = require('express').Router();
const { register, verifyEmail, login, getMe } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register', register);
router.get('/verify-email/:token', verifyEmail);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);

module.exports = router;