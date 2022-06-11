import Profile from "../models/Profile.js"
import User from "../models/User.js"


export const uploadController = async (req, res, next) => {
  if (req.file) {
    try {
      let profilePic = `/uploads/users/${req.file.filename}`
      let profile = await Profile.findOne({ user: req.user._id })
      if (profile) {
        await Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: { profilePicture: profilePic } }
        )
      }

      await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { profilePicture: profilePic } }
      )

      res.status(200).json({
        profilePic
      })

    } catch (error) {

      res.status(500).json({
        profilePic : req.user.profilePicture
      })

    }
  } else {
    res.status(500).json({
      profilePic : req.user.profilePicture
    })
  }
}