import mongoose from "mongoose"

const { Schema, model } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    maxlength: 15,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
    unique: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
}, { timestamps: true })

const User = model("User", userSchema)
export default User