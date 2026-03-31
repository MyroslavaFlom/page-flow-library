const Book = require('../../models/Book');
const { getBooks } = require('../../services/book.service');

module.exports = {
  Query: {
    books: async (_, args) => {
      return await getBooks(args);
    },
    book: async (_, { id }) => {
      return await Book.findById(id).populate('author').populate('category');
    },
  },
  Mutation: {
    createBook: async (_, args, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Доступ заборонено');
      }
      const book = await Book.create(args);
      return await Book.findById(book._id).populate('author').populate('category');
    },
    updateBook: async (_, { id, ...args }, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Доступ заборонено');
      }
      return await Book.findByIdAndUpdate(id, args, { new: true })
        .populate('author').populate('category');
    },
    deleteBook: async (_, { id }, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Доступ заборонено');
      }
      await Book.findByIdAndDelete(id);
      return true;
    },
    toggleBook: async (_, { id }, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Доступ заборонено');
      }
      const book = await Book.findById(id);
      book.isActive = !book.isActive;
      await book.save();
      return await Book.findById(id).populate('author').populate('category');
    },
  },
};