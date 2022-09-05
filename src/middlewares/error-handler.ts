import { Response, Request, NextFunction } from 'express';

import { CustomeError } from '../types/error-type';

export const allErrorHandler = (err: CustomeError, _req: Request, res: Response, _next: NextFunction): void => {
  res.status(typeof err.status === 'number' ? err.status : 500).json({
    error: {
      status: err.status,
      message: err.message,
    },
  });
};
