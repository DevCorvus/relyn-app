import express from 'express';
import { registerMiddlewares } from '../config/middlewares';
import { processEventHandlers } from '../config/process';
import { registerRoutes } from '../config/routes';
import { registerSettings } from '../config/settings';

export async function initializeServer() {
  const app = express();

  await registerMiddlewares(app);
  registerSettings(app);
  registerRoutes(app);
  processEventHandlers();

  return app;
}
