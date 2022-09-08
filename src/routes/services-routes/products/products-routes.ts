/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import { getAllProductsData, getOneProductData } from '../../../controllers/products/products-controllers';
import adminRoutes from './admin/admin-routes';
import { areYouAnAdmin } from '../../../middlewares/isAdmin';

const router = Router();

// ROUTES
//! Get all Products
router.get('/', getAllProductsData);

//! Get one product data by id
router.get('/:id', getOneProductData);

//! ADMIN ROUTES
router.use('/', areYouAnAdmin, adminRoutes);

export default router;
