const Author = require('../models/Author');
const { sendSuccess, sendError } = require('../utils/response');

async function getAuthors(req, res, next) {
  try {
    const filter = {};
    if (req.query.isActive !== undefined) {
      filter.isActive = req.query.isActive === 'true';
    }
    const authors = await Author.find(filter);
    sendSuccess(res, { authors });
  } catch (err) {
    next(err);
  }
}

async function getAuthor(req, res, next) {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return sendError(res, 'Автора не знайдено', 404);
    sendSuccess(res, { author });
  } catch (err) {
    next(err);
  }
}

async function createAuthor(req, res, next) {
  try {
    const { firstName, lastName, bio } = req.body;
    const author = await Author.create({ firstName, lastName, bio });
    sendSuccess(res, { author }, 201);
  } catch (err) {
    next(err);
  }
}

async function updateAuthor(req, res, next) {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!author) return sendError(res, 'Автора не знайдено', 404);
    sendSuccess(res, { author });
  } catch (err) {
    next(err);
  }
}

async function deleteAuthor(req, res, next) {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) return sendError(res, 'Автора не знайдено', 404);
    sendSuccess(res, { message: 'Автора видалено' });
  } catch (err) {
    next(err);
  }
}

async function toggleAuthor(req, res, next) {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return sendError(res, 'Автора не знайдено', 404);
    author.isActive = !author.isActive;
    await author.save();
    sendSuccess(res, { author });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor, toggleAuthor };
