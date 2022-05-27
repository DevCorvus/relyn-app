import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import User from '../models/User';
import Token from '../models/Token';

import { PayloadInterface, tokenSlayer } from '../utils/token';
import { ACCESS_TOKEN_SECRET } from '../utils/env';

export async function authToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Token Required');
  if (tokenSlayer.get().includes(token)) return res.sendStatus(403);

  try {
    const { _id } = verify(token, ACCESS_TOKEN_SECRET) as PayloadInterface;
    const user = await User.exists({ _id });

    if (!user) {
      await Token.deleteMany({ refreshToken: token });
      return res.sendStatus(404);
    }

    res.locals.userId = _id;
    res.locals.accessToken = token;
  } catch {
    return res.status(403).send('Access Denied');
  }
  next();
}
