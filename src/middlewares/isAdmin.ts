import { Request, Response, NextFunction } from 'express';
import { AppErrors } from '../utils/errors/allErrors';

const admin = true;

export const areYouAnAdmin = (_req: Request, _res: Response, next: NextFunction): void => {
  if (admin) {
    next();
  } else {
    const err = new AppErrors('You are not authorized to access these routes', 400);
    next(err);
  }
};
