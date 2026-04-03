const { body } = require('express-validator');

const registerValidators = [
  body('firstName')
    .trim()
    .notEmpty().withMessage("Ім'я є обов'язковим")
    .isLength({ max: 50 }).withMessage("Ім'я не може бути довшим за 50 символів"),

  body('lastName')
    .trim()
    .notEmpty().withMessage("Прізвище є обов'язковим")
    .isLength({ max: 50 }).withMessage('Прізвище не може бути довшим за 50 символів'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email є обов\'язковим')
    .isEmail().withMessage('Введіть коректний email'),

  body('password')
    .notEmpty().withMessage('Пароль є обов\'язковим')
    .isLength({ min: 6 }).withMessage('Пароль має бути мінімум 6 символів'),
];

const loginValidators = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email є обов\'язковим')
    .isEmail().withMessage('Введіть коректний email'),

  body('password')
    .notEmpty().withMessage('Пароль є обов\'язковим'),
];

module.exports = { registerValidators, loginValidators };