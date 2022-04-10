const { check } = require('express-validator');

exports.employeeRegisterValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    check('salary')
        .not()
        .isEmpty()
        .withMessage('Salary is required'),
    check('designation')
        .not()
        .isEmpty()
        .withMessage('Designation is required'),


];