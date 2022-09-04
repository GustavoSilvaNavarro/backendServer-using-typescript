import { Request, Response, NextFunction } from 'express';

import ProductMDB from '../../container/daos/products/productsMongo';

// Get all Products
export const getAllProductsData = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const allProducts = await ProductMDB.getAllProducts();
    res.status(200).json(allProducts);
  } catch (err) {
    next(err);
  }
};

// POST add new product to database
export const addNewDataProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idProduct = await ProductMDB.addProduct(req.body);
    res.status(200).json({ id: idProduct });
  } catch (err) {
    next(err);
  }
};
