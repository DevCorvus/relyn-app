import { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import { verify } from 'jsonwebtoken';

import Token from '../models/Token';

import {
  generateTokens,
  deleteRefreshToken,
  tokenSlayer,
  sendTokens,
  PayloadInterface,
  TokenResponseInterface,
} from '../utils/token';
import {
  NODE_ENV,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_COOKIE,
  ACCESS_TOKEN_COOKIE,
} from '../utils/env';

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.signedCookies[REFRESH_TOKEN_COOKIE];
  if (!token) return res.sendStatus(401);

  const refreshTokenExists = await Token.exists({
    refreshToken: token,
  });
  if (!refreshTokenExists) return res.sendStatus(403);

  try {
    const { _id, remember } = verify(
      token,
      REFRESH_TOKEN_SECRET
    ) as PayloadInterface;
    await deleteRefreshToken(token);

    const accessToken = req.signedCookies[ACCESS_TOKEN_COOKIE];
    if (accessToken) tokenSlayer.add(accessToken);

    const tokens: TokenResponseInterface = await generateTokens(_id, remember);
    sendTokens(res, tokens);
  } catch (err) {
    res.sendStatus(500);
  }
};

export const csrfToken = async (req: Request, res: Response) => {
  if (!req.session) return res.sendStatus(500);

  if (!req.session.csrfToken)
    req.session.csrfToken = randomBytes(100).toString('base64');
  res.cookie('CSRF-TOKEN', req.session.csrfToken, {
    path: '/',
    secure: NODE_ENV === 'production' ? true : false,
  });
  res.sendStatus(200);
};
