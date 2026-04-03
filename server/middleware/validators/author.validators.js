const { body } = require('express-validator');

const createAuthorValidators = [
  body('firstName')
    .trim()
    .notEmpty().withMessage("Ім'я є обов'язковим")
    .isLength({ max: 50 }).withMessage("Ім'я не може бути довшим за 50 символів"),

  body('lastName')
    .trim()
    .notEmpty().withMessage("Прізвище є обов'язковим")
    .isLength({ max: 50 }).withMessage('Прізвище не може бути довшим за 50 символів'),

  body('bio')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Біографія не може бути довшою за 1000 символів'),
];

const updateAuthorValidators = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage("Ім'я не може бути довшим за 50 символів"),

  body('lastName')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('Прізвище не може бути довшим за 50 символів'),

  body('bio')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Біографія не може бути довшою за 1000 символів'),
];

module.exports = { createAuthorValidators, updateAuthorValidators };