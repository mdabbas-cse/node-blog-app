import mongoose from "mongoose"
import Comment from "./Comment.js"
import User from "./User.js"

const { Schema, model } = mongoose

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  thambnail: String,
  readTime: String,
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: User
    }
  ],
  dislikes: [
    {
      type: Schema.Types.ObjectId,
      ref: User
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: Comment
    }
  ]
}, { timestamps: true })

const Post = model("Post", postSchema)
export default Post