import { Router, Response, Request } from 'express';
import { join as pathJoin } from 'path';
import { getEnv } from '../config/env';

const router = Router();

router.get('/api', (req: Request, res: Response) => res.sendStatus(200));

router.get('*', (req: Request, res: Response) => {
  const { NODE_ENV } = getEnv();

  if (!(NODE_ENV === 'production')) return res.sendStatus(404);
  res.sendFile('index.html', {
    root: pathJoin(__dirname, '../../client/build/'),
  });
});

export const indexRoutes = router;
