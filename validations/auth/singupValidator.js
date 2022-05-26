import { body } from "express-validator"
import User from "../../models/User.js"

const singupValidation = [
  body('username', 'Username is required!')
    .not()
    .isLength({ min: 5, max: 15 })
    .withMessage('Username must be between 5 and 15 characters!')
    .custom(async username => {
      const user = await User.findOne({ username: username })
      if (user) {
        return Promise.reject('Username already exists!')
      }
    })
    .trim(),

  body('email', 'Email is required!')
    .not()
    .isEmail()
    .withMessage('Email must be valid!')
    .custom(async email => {
      const user = await User.findOne({ email: email })
      if (user) {
        return Promise.reject('Email already exists!')
      }
    })
    .normalizeEmail(),

  body('password', 'Password is required!')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long!')
    .trim(),

  body('confpassword', 'Password confirmation is required!')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long!')
    .custom((confpassword, { req }) => {
      if (confpassword !== req.body.password) {
        throw new Error('Password confirmation is incorrect!')
      }
      return true
    })
]

export default singupValidation

