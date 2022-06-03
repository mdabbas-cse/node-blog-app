import Flash from "../utils/Flash.js"
import Profile from "../models/Profile.js"

export const index = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id })
    console.log('dashboard/index', profile)
    if (profile) {
      return res.render('pages/dashboard/index',
        {
          title: "Dashboard",
          flashMessage: Flash.getMessage(req),
        }
      )
    }

    return res.redirect('/dashboard/create-profile')

  } catch (e) {
    next(e)
  }
}

export const createProfileGet = async (req, res, next) => {

  try {
    const profile = await Profile.findOne({ user: req.user._id })
    if (profile) {
      return res.redirect('/dashboard/edit-profile')
    }
    return res.render('pages/dashboard/create-profile',
      {
        title: "Create Profile",
        flashMessage: Flash.getMessage(req),
      }
    )
  } catch (e) {
    next(e)
  }
}

export const createProfilePost = async (req, res, next) => {

}

export const editProfileGet = async (req, res, next) => {
  next()
}

export const editProfilePost = async (req, res, next) => {

}
