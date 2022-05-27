import { Schema, model } from 'mongoose';

interface LikeInterface {
  username: string;
  createdAt?: number;
}

export interface PostInterface {
  userId: string;
  username: string;
  body: string;
  imageUrl: string;
  commentsCount: number;
  likes: LikeInterface[];
  edited: boolean;
  createdAt: number;
  updatedAt: number;
}

const postSchema = new Schema<PostInterface>(
  {
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
    imageUrl: {
      type: String,
      required: false,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    likes: {
      type: [{ username: String, createdAt: Date }],
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

export default model<PostInterface>('Post', postSchema);
