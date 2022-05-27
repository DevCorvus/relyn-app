import { initializeServer } from './core/server';
import { databaseConnection } from './core/database';
import { loadLocalEnvIfRequired } from './utils/env';
import { expiredTokensCleaner } from './utils/token';

(async () => {
  await loadLocalEnvIfRequired();

  await databaseConnection();
  await expiredTokensCleaner();

  const server = await initializeServer();

  server.listen(server.get('port'), (): void => {
    console.log('Server running on port', server.get('port'));
  });
})();
