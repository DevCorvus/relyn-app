import { Schema, model } from 'mongoose';

interface TokenInterface {
  userId: string;
  refreshToken: string;
  createdAt: number;
  expiresAt: number;
}

const tokenSchema = new Schema<TokenInterface>({
  userId: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

export default model<TokenInterface>('Token', tokenSchema);
