import Token from '../database/models/Token';
import User from '../database/models/User';

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

export const removeExpiredTokens = async () => {
  await Token.deleteMany({ expiresAt: { $lt: Date.now() } });
};
