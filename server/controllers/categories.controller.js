const Category = require('../models/Category');
const { sendSuccess, sendError } = require('../utils/response');

async function getCategories(req, res, next) {
  try {
    const filter = {};
    if (req.query.isActive !== undefined) {
      filter.isActive = req.query.isActive === 'true';
    }
    const categories = await Category.find(filter);
    sendSuccess(res, { categories });
  } catch (err) {
    next(err);
  }
}

async function getCategory(req, res, next) {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return sendError(res, 'Категорію не знайдено', 404);
    sendSuccess(res, { category });
  } catch (err) {
    next(err);
  }
}

async function createCategory(req, res, next) {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    sendSuccess(res, { category }, 201);
  } catch (err) {
    next(err);
  }
}

async function updateCategory(req, res, next) {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) return sendError(res, 'Категорію не знайдено', 404);
    sendSuccess(res, { category });
  } catch (err) {
    next(err);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return sendError(res, 'Категорію не знайдено', 404);
    sendSuccess(res, { message: 'Категорію видалено' });
  } catch (err) {
    next(err);
  }
}

async function toggleCategory(req, res, next) {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return sendError(res, 'Категорію не знайдено', 404);
    category.isActive = !category.isActive;
    await category.save();
    sendSuccess(res, { category });
  } catch (err) {
    next(err);
  }
}

module.exports = { getCategories, getCategory, createCategory, updateCategory, deleteCategory, toggleCategory };