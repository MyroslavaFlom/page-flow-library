const Category = require('../../models/Category');

module.exports = {
  Query: {
    categories: async () => await Category.find(),
    category: async (_, { id }) => await Category.findById(id),
  },
  Mutation: {
    createCategory: async (_, args, context) => {
      if (!context.user || context.user.role !== 'admin') throw new Error('Доступ заборонено');
      return await Category.create(args);
    },
    updateCategory: async (_, { id, ...args }, context) => {
      if (!context.user || context.user.role !== 'admin') throw new Error('Доступ заборонено');
      return await Category.findByIdAndUpdate(id, args, { new: true });
    },
    deleteCategory: async (_, { id }, context) => {
      if (!context.user || context.user.role !== 'admin') throw new Error('Доступ заборонено');
      await Category.findByIdAndDelete(id);
      return true;
    },
    toggleCategory: async (_, { id }, context) => {
      if (!context.user || context.user.role !== 'admin') throw new Error('Доступ заборонено');
      const category = await Category.findById(id);
      category.isActive = !category.isActive;
      await category.save();
      return category;
    },
  },
};