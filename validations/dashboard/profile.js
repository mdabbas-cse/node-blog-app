import { body } from 'express-validator'

const profileValidtion = [
  body('name')
    .not().isEmpty().withMessage('Name Cannot be empty')
    .isLength({ max: 50 }).withMessage('Name cannot be more them 50 chars'),

  body('title')
    .not().isEmpty().withMessage('Title cannot be empty.')
    .isLength({ max: 200 }).withMessage('Name cannot be more them 200 chars'),
]

export default profileValidtion