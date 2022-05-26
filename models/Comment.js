import { Schema, model } from "mongoose"
import Post from "./Post"
import User from "./User.js"

const commentSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  // likes: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: User,
  //     required: true
  //   }
  // ],
  replies: [
    {
      body: {
        type: String,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now()
      }
    }
  ]
}, { timestamps: true })

const Comment = model("Comment", commentSchema)
export default Comment