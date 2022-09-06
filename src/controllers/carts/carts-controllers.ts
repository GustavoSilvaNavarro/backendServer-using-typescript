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
