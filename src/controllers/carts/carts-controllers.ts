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
