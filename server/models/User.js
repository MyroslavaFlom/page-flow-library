const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true, maxlength: 50 },
  lastName:  { type: String, required: true, trim: true, maxlength: 50 },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  passwordHash:        { type: String, required: true },
  role:                { type: String, enum: ['user', 'admin'], default: 'user' },
  isVerified:          { type: Boolean, default: false },
  verifyToken:         { type: String, default: null },
  verifyTokenExpires:  { type: Date, default: null },
  createdAt:           { type: Date, default: Date.now },
}, { timestamps: false });

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  delete obj.verifyToken;
  return obj;
};

module.exports = mongoose.model('User', userSchema);