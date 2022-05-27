import dotenv from 'dotenv';
dotenv.config();

import { initializeServer } from './core/server';
import { databaseConnection } from './core/database';
import { expiredTokensCleaner } from './utils/token';

(async () => {
  await databaseConnection();
  await expiredTokensCleaner();

  const server = await initializeServer();

  server.listen(server.get('port'), (): void => {
    console.log('Server running on port', server.get('port'));
  });
})();
