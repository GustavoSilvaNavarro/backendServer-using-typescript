/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {
  createNewCart,
  deleteSingleCart,
  addProductsToCart,
  getAllProductsFromCart,
  deleteSingleProduct,
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

//! DELETE - Find specific Cart by ID and delete single product by ID
router.delete('/:idCart/products/:idProduct', deleteSingleProduct);

export default router;
