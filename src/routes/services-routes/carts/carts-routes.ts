/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import { createNewCart, deleteSingleCart } from '../../../controllers/carts/carts-controllers';

const router = Router();

// ROUTES
//! POST - Create new cart
router.post('/', createNewCart);

//! DELETE - Delete an specific cart by ID
router.delete('/:id', deleteSingleCart);

//! GET - All products from an specific cart by ID
//! POST - Add an specific to an specific cart by ID
//! DELETE - Create new cart

export default router;
