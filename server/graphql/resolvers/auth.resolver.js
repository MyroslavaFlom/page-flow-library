const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const jwtConfig = require('../../config/jwt');

module.exports = {
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email }).select('+passwordHash');
      if (!user) throw new Error('Невірний email або пароль');
      if (!user.isVerified) throw new Error('Підтвердіть email перед входом');
      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) throw new Error('Невірний email або пароль');
      const token = jwt.sign(
        { id: user._id, role: user.role },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
      );
      return { token, user };
    },
  },
  Query: {
    me: async (_, __, context) => {
      if (!context.user) throw new Error('Не авторизовано');
      return await User.findById(context.user.id);
    },
  },
};