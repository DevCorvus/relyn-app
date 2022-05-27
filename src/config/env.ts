export function getEnv() {
  return {
    NODE_ENV: process.env.NODE_ENV as string,
    PORT: parseInt(process.env.PORT as string),
    MONGOPATH: process.env.MONGOPATH as string,
    SESSION_COOKIES_SECRET: process.env.SESSION_COOKIES_SECRET as string,
    SIGNED_COOKIES_SECRET: process.env.SIGNED_COOKIES_SECRET as string,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
    ACCESS_TOKEN_COOKIE: process.env.ACCESS_TOKEN_COOKIE as string,
    REFRESH_TOKEN_COOKIE: process.env.REFRESH_TOKEN_COOKIE as string,
    ACCESS_TOKEN_EXPIRATION: parseInt(
      process.env.ACCESS_TOKEN_EXPIRATION as string
    ),
    REFRESH_TOKEN_EXPIRATION: parseInt(
      process.env.REFRESH_TOKEN_EXPIRATION as string
    ),
  };
}
