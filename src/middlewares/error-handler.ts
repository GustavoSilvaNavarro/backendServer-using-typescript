import { Response, Request, NextFunction } from 'express';

import { AppErrors } from '../utils/errors/allErrors';
import { CustomeError } from '../types/error-type';

// NON EXISTING ROUTES
export const notFoundPage = (_req: Request, _res: Response, next: NextFunction): void => {
  const err = new AppErrors('Page not Found!', 404);
  next(err);
};

export const allErrorHandler = (err: CustomeError, _req: Request, res: Response, _next: NextFunction): void => {
  res.status(typeof err.status === 'number' ? err.status : 500).json({
    error: {
      status: err.status,
      message: err.message,
    },
  });
};
