import bcryptjs from 'bcryptjs'
import { validationResult } from 'express-validator'
import User from '../models/User.js'
import { validationFormatter } from '../utils/validationFormatter.js'

export const singupGet = async (req, res, next) => {
  res.render(
    'pages/auth/singup',
    {
      title: 'Create an Account',
      errors: {},
      values: {},
    },
  )
}

export const singupPost = async (req, res, next) => {
  const { username, email, password } = req.body
  const errors = validationResult(req).formatWith(validationFormatter)
  if (!errors.isEmpty()) {
    return res.render(
      'pages/auth/singup',
      {
        title: 'Create an Account',
        errors: errors.mapped(),
        values: { username, email, password },
      },
    )
  }

  try {
    const hashedPassword = await bcryptjs.hash(password, 11)
    const user = new User({
      username,
      email,
      password: hashedPassword,
    })
    const userData = await user.save()
    res.redirect('/auth/login')
  } catch (error) {
    next(error)
  }
}

export const loginGet = async (req, res, next) => {
  res.render(
    'pages/auth/login',
    {
      title: 'Login || Blog',
      errors: {},
      values: {},
    },
  )
}

export const loginPost = async (req, res, next) => {
  const { email, password } = req.body

  const errors = validationResult(req).formatWith(validationFormatter)
  console.log('errors', errors)
  if (!errors.isEmpty()) {
    return res.render(
      'pages/auth/login',
      {
        title: 'Login || Blog',
        errors: errors.mapped(),
        values: { email }
      },
    )
  }

  try {
    const user = await User.findOne({ email })
    console.log(user)
    if (!user) {
      throw new Error('User not found')
    }
    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch) {
      throw new Error('Password is incorrect')
    }
    // req.session.user = user
    req.session.user = user
    req.session.isLoggedIn = true
    req.session.save(err => {
      if (err) {
        next(err)
      }
      res.redirect('/dashboard')
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const logout = async (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      return next(err)
    }
    return res.redirect('/auth/login')
  })
}
