import { Request, Response, NextFunction } from 'express';

import CartMDB from '../../container/daos/carts/cartsMongo';

//! POST - Create new cart
export const createNewCart = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idCart = await CartMDB.addNewCart();
    res.status(200).json({ id: idCart });
  } catch (err) {
    next(err);
  }
};

//! DELETE - Delete an specific cart by ID
export const deleteSingleCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response = await CartMDB.deleteCart(req.params.id);
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

//! GET - All products from an specific cart by ID
export const getAllProductsFromCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response = await CartMDB.listAllProductsFromCart(req.params.idCart);
    if (response.length > 0) {
      res.status(200).json({ allProducts: response });
    } else {
      res.status(200).send('Cart is empty!');
    }
  } catch (err) {
    next(err);
  }
};

//! PUT - Add an specific Product by ID to an specific Cart by ID
export const addProductsToCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response = await CartMDB.addSingleProductToCart(req.params.idCart, req.params.idProduct);
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

//! DELETE - Find specific Cart by ID and delete single product by ID
export const deleteSingleProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response = await CartMDB.deleteOneProductFromCart(req.params.idCart, req.params.idProduct);
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};
