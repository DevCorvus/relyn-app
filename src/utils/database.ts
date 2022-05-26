import Token from '../models/Token';
import User from '../models/User';
import { DAY_IN_MS } from './constants';

export const getUserUsername = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) return false;
  return user.username;
};

export const getUserInfo = async (username: string) => {
  const user = await User.findOne(
    { username },
    {
      _id: 0,
      password: 0,
      email: 0,
      follows: 0,
      createdAt: 0,
      updatedAt: 0,
    }
  ).lean();

  if (!user) return false;
  return user;
};

const removeExpiredTokens = async () => {
  await Token.deleteMany({ expiresAt: { $lt: Date.now() } });
};

export const expiredTokensCleaner = async () => {
  try {
    await removeExpiredTokens();
    setInterval(async () => {
      await removeExpiredTokens();
    }, DAY_IN_MS);
  } catch (err) {
    console.error('Failed to remove expired tokens:', err);
  }
};
