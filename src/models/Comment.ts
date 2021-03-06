import { Schema, model } from 'mongoose';

export interface CommentInterface {
  postId: string;
  userId: string;
  username: string;
  body: string;
  edited: boolean;
  createdAt: number;
  updatedAt: number;
}

const commentSchema = new Schema<CommentInterface>(
  {
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    edited: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model<CommentInterface>('Comment', commentSchema);
