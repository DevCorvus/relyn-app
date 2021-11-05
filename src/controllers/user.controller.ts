import type { Request, Response } from "express";
import User, { UserInterface, UserDataInterface } from "../database/models/User";
import {
  generateTokens,
  deleteRefreshToken,
  deleteAllRefreshToken,
  TokenResponseInterface,
  tokenSlayer,
  sendTokens
} from "../utils/token";
import { getUserInfo } from "../utils/database";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "../utils/env";
import { randomBytes } from "crypto";

interface UserLoginInterface {
  usernameOrEmail: string;
  password: string;
  remember: boolean;
}

interface UserSearchInterface {
  username: string;
  email: string;
}

interface UserEmailChangeInterface {
  password: string;
  newEmail: string;
}

export const index = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, { password: 0, updatedAt: 0 });
    res.status(200).json(users);
  } catch (err) {
    res.sendStatus(500);
  }
};

export const exists = async (req: Request, res: Response) => {
  const { username, email } = req.body as UserSearchInterface;
  if (username) {
    const usernameExists: boolean = await User.exists({ username });
    if (usernameExists) return res.status(409).send("Username isn't available");
  }
  if (email) {
    const emailExists: boolean = await User.exists({ email });
    if (emailExists) return res.status(409).send("Email isn't available");
  }
  res.sendStatus(204);
};

const store = async (req: Request, res: Response) => {
  const { username, email, password } = req.body as UserDataInterface;

  try {
    const randomString = randomBytes(16).toString("hex");
    const newUser: UserInterface = new User({
      avatar: randomString,
      nickname: username,
      followers: 0,
      follows: [],
      username,
      email,
      password,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    newUser.password = await newUser.encryptPassword(password);
    const { _id } = await newUser.save();

    const tokens: TokenResponseInterface = await generateTokens(_id);
    sendTokens(res, tokens);

  } catch (err) {
    res.status(409).send("User already exist");
  }
};

const login = async (req: Request, res: Response) => {
  const token = req.signedCookies[REFRESH_TOKEN_COOKIE];
  if (token) return res.status(409).send("User Already Logged In");

  const { usernameOrEmail, password, remember } = req.body as UserLoginInterface;
  let user = await User.findOne({ username: usernameOrEmail });
  if (!user) user = await User.findOne({ email: usernameOrEmail });
  if (!user) return res.status(400).send("Invalid Username or Email");

  const validatedPassword: boolean = await user.validatePassword(password);
  if (!validatedPassword) return res.status(400).send("Wrong password");

  const tokens: TokenResponseInterface = await generateTokens(user._id, remember);
  sendTokens(res, tokens);
};

const logout = async (req: Request, res: Response) => {
  const token = req.signedCookies[REFRESH_TOKEN_COOKIE];
  tokenSlayer.add(res.locals.accessToken);
  if (!token) return res.sendStatus(403);
  await deleteRefreshToken(token);
  res.clearCookie(ACCESS_TOKEN_COOKIE);
  res.clearCookie(REFRESH_TOKEN_COOKIE);
  res.sendStatus(204);
};
 
const account = async (req: Request, res: Response) => {
  const user = await User.findById(res.locals.userId, { password: 0 });
  if (!user) return res.status(404).send("No user found");
  res.status(200).json(user);
};

const changeAvatar = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const { newAvatar } = req.body;
  try {
    await User.findByIdAndUpdate(userId, {
      avatar: newAvatar
    });
    return res.status(201).send("Avatar updated successfully");

  } catch(e) {
    res.sendStatus(500);
  }
};

const changeNickname = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const { newNickname } = req.body;
  try {
    await User.findByIdAndUpdate(userId, {
      nickname: newNickname
    });
    return res.status(201).send("Nickname updated successfully");

  } catch(e) {
    res.sendStatus(500);
  }
};

const changePassword = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const password = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  try {
    const user = await User.findById(userId);
    if (!user) return res.sendStatus(404);

    const validatedPassword = await user.validatePassword(password);
    if (!validatedPassword) return res.status(403).send("Wrong password");

    user.password = await user.encryptPassword(newPassword);
    await user.save();

    return res.status(201).send("Password updated successfully");

  } catch (err) {
    return res.sendStatus(500);
  }
};

const changeEmail = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const { password, newEmail } = req.body as UserEmailChangeInterface;
  
  try {
    const emailAlreadyExists = await User.exists({ email: newEmail });
    if (emailAlreadyExists) return res.status(409).send("Email isn't available");

    const user = await User.findById(userId);
    if (!user) return res.sendStatus(404);

    const validatedPassword = await user.validatePassword(password);
    if (!validatedPassword) return res.status(403).send("Wrong password");

    user.email = newEmail;
    await user.save();

    return res.status(201).send("Email updated successfully");

  } catch(err) {
    return res.sendStatus(500);
  }
};

const destroy = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const password = req.body.password;

  try {
    const user = await User.findById(userId);
    if (!user) return res.sendStatus(404);

    const validatedPassword = await user.validatePassword(password);
    if (!validatedPassword) return res.status(403).send("Wrong password");

    tokenSlayer.add(res.locals.accessToken);
    await deleteAllRefreshToken(userId);
    await user.delete();

    res.clearCookie(ACCESS_TOKEN_COOKIE);
    res.clearCookie(REFRESH_TOKEN_COOKIE);
    return res.status(200).send("User deleted successfully");

  } catch (err) {
    return res.sendStatus(500);
  }
};

const info = async (req: Request, res: Response) => {
  const username = req.params.username;

  try {
    const userInfo = await getUserInfo(username);
    if (!userInfo) return res.status(404).send("User not found");

    res.status(200).json(userInfo);

  } catch(e) {
    res.sendStatus(500);
  }
};

const follow = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const username = req.params.username;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");
    if (user.username === username) return res.status(409).send("Trying to follow yourself huh?");

    const userToFollow = await User.findOne({ username });
    if (!userToFollow) return res.status(404).send("User to follow not found");

    const userAlreadyFollowed = user.follows.filter(follow => follow.username === username).length > 0;
    if (userAlreadyFollowed) return res.status(409).send("User already followed");
    
    user.follows.push({
      username,
      createdAt: Date.now()
    });
    userToFollow.followers += 1;

    await user.save();
    await userToFollow.save();

    res.status(201).send("Followed");
    
  } catch (e) {
    res.sendStatus(500);
  }
};

const unfollow = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const username = req.params.username;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");
    if (user.username === username) return res.status(409).send("Trying to unfollow yourself huh?");

    const userToUnfollow = await User.findOne({ username });
    if (!userToUnfollow) return res.status(404).send("User to unfollow not found");

    const userAlreadyFollowed = user.follows.filter(follow => follow.username === username).length > 0;
    if (!userAlreadyFollowed) return res.status(409).send("User not followed");

    user.follows = user.follows.filter(follow => follow.username !== username);
    userToUnfollow.followers -= 1;

    await user.save();
    await userToUnfollow.save();

    res.status(201).send("Unfollowed");
  } catch(e) {
    res.sendStatus(500);
  }
};

const followsInfo = async (req: Request, res: Response) => {
  const userId = res.locals.userId;

  try {
    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).send("User not found");
  
    const usersInfo = await Promise.all(user.follows.map(async (follow) => await getUserInfo(follow.username)));
    res.status(200).json(usersInfo);

  } catch(e) {
    res.sendStatus(500);
  }
};

export default {
  index,
  exists,
  store,
  login,
  logout,
  account,
  changeAvatar,
  changeNickname,
  changePassword,
  changeEmail,
  destroy,
  info,
  follow,
  unfollow,
  followsInfo,
};