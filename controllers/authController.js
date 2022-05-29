import bcryptjs from 'bcryptjs'
import { validationResult } from 'express-validator'
import User from '../models/User.js'
import Flash from '../utils/Flash.js'
import { validationFormatter } from '../utils/validationFormatter.js'

export const singupGet = async (req, res, next) => {
  res.render(
    'pages/auth/singup',
    {
      title: 'Create an Account',
      errors: {},
      values: {},
      flashMessage: Flash.getMessage(req),
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
        flashMessage: Flash.getMessage(req),
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
    await user.save()
    req.flash('success', 'You have successfully created an account, Please login')
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
      flashMessage: Flash.getMessage(req),
    },
  )
}

export const loginPost = async (req, res, next) => {
  const { email, password } = req.body

  const errors = validationResult(req).formatWith(validationFormatter)
  if (!errors.isEmpty()) {
    req.flash('fail', 'Invalid email or password')
    return res.render(
      'pages/auth/login',
      {
        title: 'Login || Blog',
        errors: errors.mapped(),
        values: { email },
        flashMessage: Flash.getMessage(req),
      },
    )
  }

  try {
    const user = await User.findOne({ email })
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
      req.flash('success', 'You have successfully logged in')
      res.redirect('/dashboard')
    })
  } catch (error) {
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
