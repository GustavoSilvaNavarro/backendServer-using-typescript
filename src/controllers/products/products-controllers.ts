import { Request, Response, NextFunction } from 'express';

// Get all Products
export const getAllProductsData = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    res.status(200).send('This is a get petition');
  } catch (err) {
    next(err);
  }
};

// POST add new product to database
export const addNewDataProduct = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    res.status(200).send('Hello World!');
  } catch (err) {
    next(err);
  }
};
