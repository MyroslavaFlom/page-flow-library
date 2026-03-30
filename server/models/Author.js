const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true, maxlength: 50 },
  lastName:  { type: String, required: true, trim: true, maxlength: 50 },
  bio:       { type: String, trim: true, maxlength: 1000 },
  isActive:  { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: false });

authorSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('Author', authorSchema);