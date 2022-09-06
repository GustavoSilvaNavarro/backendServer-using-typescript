/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {
  addNewDataProduct,
  updateDataProduct,
  deleteProduct,
} from '../../../../controllers/products/products-controllers';

const router = Router();

// ROUTES
// POST add new product to database
router.post('/', addNewDataProduct);

// PUT Update product by id
router.put('/:id', updateDataProduct);

// DELETE PRODUCT BY ID
router.delete('/:id', deleteProduct);

export default router;
