const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name:        { type: String, required: true, unique: true, trim: true, maxlength: 100 },
  description: { type: String, trim: true, maxlength: 500 },
  isActive:    { type: Boolean, default: true },
  createdAt:   { type: Date, default: Date.now },
}, { timestamps: false });

module.exports = mongoose.model('Category', categorySchema);