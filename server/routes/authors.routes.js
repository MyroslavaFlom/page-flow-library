const router = require('express').Router();
const {
  getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor, toggleAuthor
} = require('../controllers/authors.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');
const { createAuthorValidators, updateAuthorValidators } = require('../middleware/validators/author.validators');
const validate = require('../middleware/validate.middleware');

router.get('/', getAuthors);
router.get('/:id', getAuthor);
router.post('/', authMiddleware, adminMiddleware, createAuthorValidators, validate, createAuthor);
router.put('/:id', authMiddleware, adminMiddleware, updateAuthorValidators, validate, updateAuthor);
router.delete('/:id', authMiddleware, adminMiddleware, deleteAuthor);
router.patch('/:id/toggle', authMiddleware, adminMiddleware, toggleAuthor);

module.exports = router;