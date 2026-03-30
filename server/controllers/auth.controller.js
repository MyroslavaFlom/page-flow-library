const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtConfig = require('../config/jwt');
const { sendVerificationEmail } = require('../services/email.service');
const { sendSuccess, sendError } = require('../utils/response');

async function register(req, res, next) {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return sendError(res, 'Email вже використовується', 409);

    const passwordHash = await bcrypt.hash(password, 12);
    const verifyToken = crypto.randomBytes(32).toString('hex');
    const verifyTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

    const user = await User.create({
      firstName,
      lastName,
      email,
      passwordHash,
      isVerified: false,
      verifyToken,
      verifyTokenExpires,
    });

    const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${verifyToken}`;
    await sendVerificationEmail(email, verifyUrl);

    return sendSuccess(res, { message: 'Лист надіслано на email' }, 201);
  } catch (err) {
    next(err);
  }
}

async function verifyEmail(req, res, next) {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpires: { $gt: Date.now() },
    });

    if (!user) return sendError(res, 'Токен недійсний або прострочений', 400);

    user.isVerified = true;
    user.verifyToken = null;
    user.verifyTokenExpires = null;
    await user.save();

    return sendSuccess(res, { message: 'Email підтверджено' });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) return sendError(res, 'Невірний email або пароль', 401);

    if (!user.isVerified) return sendError(res, 'Підтвердіть email перед входом', 403);

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return sendError(res, 'Невірний email або пароль', 401);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    return sendSuccess(res, { token, user });
  } catch (err) {
    next(err);
  }
}

async function getMe(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    return sendSuccess(res, { user });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, verifyEmail, login, getMe };