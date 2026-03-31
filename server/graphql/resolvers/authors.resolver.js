const Author = require('../../models/Author');

module.exports = {
  Query: {
    authors: async () => await Author.find(),
    author: async (_, { id }) => await Author.findById(id),
  },
  Mutation: {
    createAuthor: async (_, args, context) => {
      if (!context.user || context.user.role !== 'admin') throw new Error('Доступ заборонено');
      return await Author.create(args);
    },
    updateAuthor: async (_, { id, ...args }, context) => {
      if (!context.user || context.user.role !== 'admin') throw new Error('Доступ заборонено');
      return await Author.findByIdAndUpdate(id, args, { new: true });
    },
    deleteAuthor: async (_, { id }, context) => {
      if (!context.user || context.user.role !== 'admin') throw new Error('Доступ заборонено');
      await Author.findByIdAndDelete(id);
      return true;
    },
    toggleAuthor: async (_, { id }, context) => {
      if (!context.user || context.user.role !== 'admin') throw new Error('Доступ заборонено');
      const author = await Author.findById(id);
      author.isActive = !author.isActive;
      await author.save();
      return author;
    },
  },
};