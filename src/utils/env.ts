import { getEnv } from '../config/env';

export const loadLocalEnvIfRequired = async () => {
  const { NODE_ENV } = getEnv();

  if (NODE_ENV !== 'production') {
    const dotenv = (await import('dotenv')).default;
    dotenv.config();
  }
};
