const router = require('express').Router();
const {
  getBooks, getBook, createBook, updateBook, deleteBook, toggleBook
} = require('../controllers/books.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', authMiddleware, adminMiddleware, createBook);
router.put('/:id', authMiddleware, adminMiddleware, updateBook);
router.delete('/:id', authMiddleware, adminMiddleware, deleteBook);
router.patch('/:id/toggle', authMiddleware, adminMiddleware, toggleBook);

module.exports = router;