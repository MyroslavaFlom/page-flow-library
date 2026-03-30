const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title:         { type: String, required: true, trim: true, maxlength: 200 },
  author:        { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  category:      { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description:   { type: String, trim: true, maxlength: 2000 },
  isbn:          { type: String, trim: true, maxlength: 20 },
  publishedYear: { type: Number, min: 1000, max: new Date().getFullYear() },
  coverUrl:      { type: String, trim: true },
  isActive:      { type: Boolean, default: true },
  createdAt:     { type: Date, default: Date.now },
  updatedAt:     { type: Date, default: Date.now },
}, { timestamps: false });

bookSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

bookSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Book', bookSchema);