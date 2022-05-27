import User from '../models/User.js'

export const bindUserWithRequest = () => {
  return async (req, res, next) => {
    if (!req.session.isLoggedIn) {
      return next()
    }

    try {
      const user = await User.findById(req.session.user._id)
      req.user = user
      next()

    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

export const isAuthencated = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/auth/login')
  }
  next()
}

export const isLoggedIn = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.redirect('/dashboard')
  }
  next()
}