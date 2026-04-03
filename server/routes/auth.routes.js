const router = require('express').Router();
const { register, verifyEmail, login, getMe } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { registerValidators, loginValidators } = require('../middleware/validators/auth.validators');
const validate = require('../middleware/validate.middleware');

router.post('/register', registerValidators, validate, register);
router.get('/verify-email/:token', verifyEmail);
router.post('/login', loginValidators, validate, login);
router.get('/me', authMiddleware, getMe);

module.exports = router;