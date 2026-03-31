const Book = require('../models/Book');

async function getBooks(query) {
  const { search, category, author, isActive, page = 1, limit = 10 } = query;

  const filter = {};

  if (search) {
    filter.$text = { $search: search };
  }
  if (category) {
    filter.category = category;
  }
  if (author) {
    filter.author = author;
  }
  if (isActive !== undefined) {
    filter.isActive = isActive === 'true' || isActive === true;
  }

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Book.countDocuments(filter);
  const books = await Book.find(filter)
    .populate('author')
    .populate('category')
    .skip(skip)
    .limit(Number(limit));

  return {
    books,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
  };
}

module.exports = { getBooks };