import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface FollowInterface {
  username: string;
  createdAt: number;
}

export interface UserInterface extends Document {
  avatar: string;
  nickname: string;
  followers: number;
  follows: FollowInterface[];
  username: string;
  email: string;
  password: string;
  createdAt: number;
  updatedAt: number;
  encryptPassword: (password: string) => Promise<string>;
  validatePassword: (password: string) => Promise<boolean>;
}

export interface UserDataInterface {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<UserInterface>(
  {
    avatar: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    followers: {
      type: Number,
      default: 0,
    },
    follows: {
      type: [{ username: String, createdAt: Date }],
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.encryptPassword = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<UserInterface>('User', userSchema);
