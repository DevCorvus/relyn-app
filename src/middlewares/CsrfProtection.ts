import type { Response, Request, NextFunction } from 'express';

const CsrfProtection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session) return res.sendStatus(500);
  const csrfTokenFromClient = req.headers['csrf-token'];
  const csrfTokenFromServer = req.session.csrfToken;

  if (!(csrfTokenFromClient === csrfTokenFromServer))
    return res.status(403).send('Invalid CSRF-TOKEN');
  next();
};

export default CsrfProtection;
