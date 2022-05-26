import type { Request, Response, NextFunction } from 'express';

export const redirectOverHttps = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.secure) return res.redirect('https://' + req.headers.host + req.url);
  next();
};
