import { Request, Response } from 'express';

export const envRequired = (req: Request, res: Response) => {
  res.status(500).send('Environment variables are missing');
};
