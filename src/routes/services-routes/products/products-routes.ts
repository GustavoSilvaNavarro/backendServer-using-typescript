import { Router } from 'express';

import adminRoutes from './admin/admin-routes';

const router = Router();

// ROUTES
// // Get all Products
// router.get('/', getAllProductsData);

// // Get one product data by id
// router.get('/:id', getOneProductData);

// ADMIN ROUTES
router.use('/', adminRoutes);

export default router;