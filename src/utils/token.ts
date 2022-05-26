import type { Response } from 'express';
import jwt from 'jsonwebtoken';
import Token from '../models/Token';
import {
  NODE_ENV,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from '../utils/env';

const yearInMs: number = 31536000000;

export interface PayloadInterface {
  _id: string;
  remember?: boolean;
  iat: number;
  exp: number;
}

interface TokensInterface {
  accessToken: string;
  refreshToken: string;
  remember: boolean;
}

export type TokenResponseInterface = TokensInterface | false;

type Token = string;
export const tokenSlayer = ((slayTime: number) => {
  let tokensInLine: Token[] = [];
  return {
    get: () => tokensInLine,
    add: (token: Token) => {
      tokensInLine.push(token);
      setTimeout(() => {
        tokensInLine = tokensInLine.filter(
          (tokenInLine) => tokenInLine !== token
        );
      }, slayTime);
    },
  };
})(ACCESS_TOKEN_EXPIRATION);

export const deleteRefreshToken = async (token: string): Promise<boolean> => {
  try {
    await Token.findOneAndDelete({ refreshToken: token });
    return true;
  } catch (err) {
    return false;
  }
};

export const deleteAllRefreshToken = async (
  userId: string
): Promise<boolean> => {
  try {
    await Token.deleteMany({ userId });
    return true;
  } catch (err) {
    return false;
  }
};

export const generateTokens = async (
  _id: string,
  remember: boolean = false
): Promise<TokenResponseInterface> => {
  const accessToken: string = jwt.sign({ _id }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
  let refreshToken: string;
  try {
    if (!remember) {
      refreshToken = jwt.sign({ _id }, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRATION,
      });
      await Token.create({
        userId: _id,
        refreshToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + REFRESH_TOKEN_EXPIRATION,
      });
    } else {
      refreshToken = jwt.sign({ _id, remember }, REFRESH_TOKEN_SECRET, {
        expiresIn: yearInMs,
      });
      await Token.create({
        userId: _id,
        refreshToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + yearInMs,
      });
    }
    return { accessToken, refreshToken, remember };
  } catch (err) {
    return false;
  }
};

export const sendTokens = (res: Response, tokens: TokenResponseInterface) => {
  if (!tokens) return res.sendStatus(500);
  const { accessToken, refreshToken } = tokens;

  res.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
    maxAge: ACCESS_TOKEN_EXPIRATION,
    secure: NODE_ENV === 'production' ? true : false,
  });

  if (tokens.remember) {
    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      signed: true,
      httpOnly: true,
      maxAge: yearInMs,
      secure: NODE_ENV === 'production' ? true : false,
    });
  } else {
    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      signed: true,
      httpOnly: true,
      maxAge: REFRESH_TOKEN_EXPIRATION,
      secure: NODE_ENV === 'production' ? true : false,
    });
  }
  res.sendStatus(201);
};
