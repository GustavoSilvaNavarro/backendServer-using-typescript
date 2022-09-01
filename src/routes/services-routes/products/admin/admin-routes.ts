/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import { addNewDataProduct } from '../../../../controllers/products/products-controllers';

const router = Router();

// ROUTES
// POST add new product to database
router.post('/', addNewDataProduct);

// // PUT update product by id
// router.put('/:id', updateDataProduct);

// // DELETE PRODUCT BY ID
// router.delete('/:id', deleteProduct);

export default router;
