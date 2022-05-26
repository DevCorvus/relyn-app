import dotenv from 'dotenv';
dotenv.config();

import server from './config/server';
import { databaseConnection } from './database/connection';
import { expiredTokensCleaner } from './utils/database';

(async () => {
  await databaseConnection();
  await expiredTokensCleaner();

  server.listen(server.get('port'), (): void => {
    console.log(`Server running on port ${server.get('port')}`);
  });
})();
