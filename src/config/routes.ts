import { Application } from 'express';

import { indexRoutes } from '../routes/index.routes';
import { authRoutes } from '../routes/auth.routes';
import { userRoutes } from '../routes/user.routes';
import { postRoutes } from '../routes/post.routes';
import { commentRoutes } from '../routes/comment.routes';

export function registerRoutes(app: Application) {
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/posts', postRoutes, commentRoutes);
  app.use(indexRoutes);
}
