import { Application, json } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import { getEnv } from './env';

import { redirectOverHttps } from '../middlewares/redirectOverHttps';
import {
  limitGlobalRequestsPerIp,
  rateLimiter,
} from '../middlewares/rateLimiter';
import { checkMissingEnv } from '../middlewares/checkMissingEnv';

export async function registerMiddlewares(app: Application) {
  const { NODE_ENV, SIGNED_COOKIES_SECRET, SESSION_COOKIES_SECRET } = getEnv();

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'img-src': ['*', 'data:'],
        },
      },
    })
  );
  if (NODE_ENV === 'production') {
    app.enable('trust proxy');
    app.use(redirectOverHttps);
    app.use(checkMissingEnv(Object.keys(getEnv())));
    app.use(rateLimiter(limitGlobalRequestsPerIp));
  } else {
    const morgan = (await import('morgan')).default;
    app.use(morgan('dev'));

    const cors = (await import('cors')).default;
    app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
      })
    );
  }
  app.use(json());
  app.use(cookieParser(SIGNED_COOKIES_SECRET));
  app.use(
    cookieSession({
      name: 'session',
      secret: SESSION_COOKIES_SECRET || 'secret',
      path: '/',
      httpOnly: true,
      secure: NODE_ENV === 'production' ? true : false,
    })
  );
}
