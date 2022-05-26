import { Application, json } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';

import {
  NODE_ENV,
  SESSION_COOKIES_SECRET,
  SIGNED_COOKIES_SECRET,
} from '../utils/env';
import { redirectOverHttps } from '../middlewares/redirectOverHttps';

export async function registerMiddlewares(app: Application) {
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
  } else {
    app.use(morgan('dev'));
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
