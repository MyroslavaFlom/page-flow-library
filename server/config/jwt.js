module.exports = {
  secret: process.env.JWT_SECRET,
  expiresIn: '7d',
  refreshExpiresIn: '30d',
};