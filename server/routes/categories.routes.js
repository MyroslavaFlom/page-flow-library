const router = require('express').Router();
const {
  getCategories, getCategory, createCategory, updateCategory, deleteCategory, toggleCategory
} = require('../controllers/categories.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', authMiddleware, adminMiddleware, createCategory);
router.put('/:id', authMiddleware, adminMiddleware, updateCategory);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCategory);
router.patch('/:id/toggle', authMiddleware, adminMiddleware, toggleCategory);

module.exports = router;