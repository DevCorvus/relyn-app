import { NextFunction, Request, Response } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

export const limitGlobalRequestsPerIp = new RateLimiterMemory({
  keyPrefix: 'too_many_requests',
  points: 6,
  duration: 1,
});

export function rateLimiter(limiter: RateLimiterMemory) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await limiter.consume(req.ip);
      next();
    } catch (_) {
      res.sendStatus(429);
    }
  };
}
