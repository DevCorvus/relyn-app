import { Application, static as staticFiles } from 'express';
import { join as pathJoin } from 'path';
import { NODE_ENV, PORT } from '../utils/env';

export function registerSettings(app: Application) {
  app.set('port', PORT);
  if (NODE_ENV === 'production') {
    app.use(staticFiles(pathJoin(__dirname, '../../client/build')));
  }
}
