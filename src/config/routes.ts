import { Application } from 'express';

import envConfig from '../utils/env';
import errors from '../controllers/error.controller';

import indexRoutes from '../routes/index';
import authRoutes from '../routes/auth';
import userRoutes from '../routes/users';
import postRoutes from '../routes/posts';
import commentRoutes from '../routes/comments';

export function registerRoutes(app: Application) {
  if (envConfig.includes(undefined)) {
    app.all('*', errors.envRequired);
  } else {
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/posts', postRoutes, commentRoutes);
    app.use(indexRoutes);
  }
}
