import { Router } from 'express';

import productsRoutes from './products/products-routes';

const router = Router();

router.use('/products', productsRoutes);

// router.use('/carts', cartRoutes);

export default router;
