import { Request, Response, NextFunction } from 'express';

export const cors = (_req: Request, res: Response, next: NextFunction): void => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Method', '*');
  res.set('Access-Control-Allow-Headers', '*');
  next();
};
