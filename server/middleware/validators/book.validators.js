const { body } = require('express-validator');

const createBookValidators = [
  body('title')
    .trim()
    .notEmpty().withMessage('Назва книги є обов\'язковою')
    .isLength({ max: 200 }).withMessage('Назва не може бути довшою за 200 символів'),

  body('author')
    .notEmpty().withMessage('Автор є обов\'язковим')
    .isMongoId().withMessage('Некоректний ID автора'),

  body('category')
    .notEmpty().withMessage('Категорія є обов\'язковою')
    .isMongoId().withMessage('Некоректний ID категорії'),

  body('publishedYear')
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage('Некоректний рік публікації'),

  body('isbn')
    .optional()
    .trim()
    .isLength({ max: 20 }).withMessage('ISBN не може бути довшим за 20 символів'),
];

const updateBookValidators = [
  body('title')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Назва не може бути довшою за 200 символів'),

  body('author')
    .optional()
    .isMongoId().withMessage('Некоректний ID автора'),

  body('category')
    .optional()
    .isMongoId().withMessage('Некоректний ID категорії'),

  body('publishedYear')
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage('Некоректний рік публікації'),
];

module.exports = { createBookValidators, updateBookValidators };