import mongoose from "mongoose"
import Post from "./Post.js"
import User from "./User.js"

const { Schema, model } = mongoose

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  title: {
    type: String,
    trim: true,
    maxlength: 200
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500
  },
  profilePicture: String,
  links: {
    fb: String,
    twitter: String,
    linkedin: String,
    github: String,
    website: String
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: Post
    }
  ],
  bookmarks: [
    {
      type: Schema.Types.ObjectId,
      ref: Post
    }
  ],
}, { timestamps: true })

const Profile = model("Profile", profileSchema)
export default Profile