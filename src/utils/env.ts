export default [
  process.env.NODE_ENV,
  process.env.PORT,
  process.env.MONGOPATH,
  process.env.SESSION_COOKIES_SECRET,
  process.env.SIGNED_COOKIES_SECRET,
  process.env.ACCESS_TOKEN_SECRET,
  process.env.REFRESH_TOKEN_SECRET,
  process.env.ACCESS_TOKEN_COOKIE,
  process.env.REFRESH_TOKEN_COOKIE,
  process.env.ACCESS_TOKEN_EXPIRATION,
  process.env.REFRESH_TOKEN_EXPIRATION,
];

export const NODE_ENV = process.env.NODE_ENV as string;
export const PORT = parseInt(process.env.PORT as string);
export const MONGOPATH = process.env.MONGOPATH as string;
export const SESSION_COOKIES_SECRET = process.env.SESSION_COOKIES_SECRET as string;
export const SIGNED_COOKIES_SECRET = process.env.SIGNED_COOKIES_SECRET as string;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
export const ACCESS_TOKEN_COOKIE = process.env.ACCESS_TOKEN_COOKIE as string;
export const REFRESH_TOKEN_COOKIE = process.env.REFRESH_TOKEN_COOKIE as string;
export const ACCESS_TOKEN_EXPIRATION = parseInt(process.env.ACCESS_TOKEN_EXPIRATION as string);
export const REFRESH_TOKEN_EXPIRATION = parseInt(process.env.REFRESH_TOKEN_EXPIRATION as string);