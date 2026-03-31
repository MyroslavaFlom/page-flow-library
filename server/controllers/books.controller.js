const Book = require('../models/Book');
const bookService = require('../services/book.service');
const { sendSuccess, sendError } = require('../utils/response');

async function getBooks(req, res, next) {
  try {
    const result = await bookService.getBooks(req.query);
    sendSuccess(res, result);
  } catch (err) {
    next(err);
  }
}

async function getBook(req, res, next) {
  try {
    const book = await Book.findById(req.params.id).populate('author').populate('category');
    if (!book) return sendError(res, 'Книгу не знайдено', 404);
    sendSuccess(res, { book });
  } catch (err) {
    next(err);
  }
}

async function createBook(req, res, next) {
  try {
    const { title, author, category, description, isbn, publishedYear, coverUrl } = req.body;
    const book = await Book.create({ title, author, category, description, isbn, publishedYear, coverUrl });
    sendSuccess(res, { book }, 201);
  } catch (err) {
    next(err);
  }
}

async function updateBook(req, res, next) {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) return sendError(res, 'Книгу не знайдено', 404);
    sendSuccess(res, { book });
  } catch (err) {
    next(err);
  }
}

async function deleteBook(req, res, next) {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return sendError(res, 'Книгу не знайдено', 404);
    sendSuccess(res, { message: 'Книгу видалено' });
  } catch (err) {
    next(err);
  }
}

async function toggleBook(req, res, next) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return sendError(res, 'Книгу не знайдено', 404);
    book.isActive = !book.isActive;
    await book.save();
    sendSuccess(res, { book });
  } catch (err) {
    next(err);
  }
}

module.exports = { getBooks, getBook, createBook, updateBook, deleteBook, toggleBook };