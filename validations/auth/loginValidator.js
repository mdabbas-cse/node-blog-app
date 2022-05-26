import { body } from 'express-validator'
import User from '../../models/User.js'

const loginValidation = [
  body('email')
    .not()
    .isEmpty()
    .withMessage('Email cannot be empty!')
    .isEmail()
    .withMessage('Email must be valid!')
    .custom(async (email) => {
      const user = await User.findOne({ email })
      console.log('user:--', user)
      if (!user) {
        return Promise.reject('Email not found!')
      }
    }),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Password cannot be empty!')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long!')
]
export default loginValidation
