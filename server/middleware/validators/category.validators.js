const { body } = require('express-validator');

const createCategoryValidators = [
  body('name')
    .trim()
    .notEmpty().withMessage('Назва категорії є обов\'язковою')
    .isLength({ max: 100 }).withMessage('Назва не може бути довшою за 100 символів'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Опис не може бути довшим за 500 символів'),
];

const updateCategoryValidators = [
  body('name')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Назва не може бути довшою за 100 символів'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Опис не може бути довшим за 500 символів'),
];

module.exports = { createCategoryValidators, updateCategoryValidators };