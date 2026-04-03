const router = require('express').Router();
const {
  getCategories, getCategory, createCategory, updateCategory, deleteCategory, toggleCategory
} = require('../controllers/categories.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');
const { createCategoryValidators, updateCategoryValidators } = require('../middleware/validators/category.validators');
const validate = require('../middleware/validate.middleware');

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', authMiddleware, adminMiddleware, createCategoryValidators, validate, createCategory);
router.put('/:id', authMiddleware, adminMiddleware, updateCategoryValidators, validate, updateCategory);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCategory);
router.patch('/:id/toggle', authMiddleware, adminMiddleware, toggleCategory);

module.exports = router;