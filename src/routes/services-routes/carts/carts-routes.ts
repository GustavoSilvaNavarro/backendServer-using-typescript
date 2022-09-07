/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {
  createNewCart,
  deleteSingleCart,
  addProductsToCart,
  getAllProductsFromCart,
} from '../../../controllers/carts/carts-controllers';

const router = Router();

// ROUTES
//! POST - Create new cart
router.post('/', createNewCart);

//! DELETE - Delete an specific cart by ID
router.delete('/:id', deleteSingleCart);

//! GET - All products from an specific cart by ID
router.get('/:idCart/products', getAllProductsFromCart);

//! PUT - Add an specific Product by ID to an specific Cart by ID
router.put('/:idCart/products/:idProduct', addProductsToCart);

//! DELETE - Create new cart

export default router;
