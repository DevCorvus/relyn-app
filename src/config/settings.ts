import { Application, static as staticFiles } from 'express';
import { join as pathJoin } from 'path';
import { getEnv } from './env';

export function registerSettings(app: Application) {
  const { NODE_ENV, PORT } = getEnv();

  app.set('port', PORT);
  if (NODE_ENV === 'production') {
    app.use(staticFiles(pathJoin(__dirname, '../../client/build')));
  }
}
