import { Router } from 'express';

import productsRoutes from './products/products-routes';
import cartsRoutes from './carts/carts-routes';

const router = Router();

router.use('/products', productsRoutes);

router.use('/carts', cartsRoutes);

export default router;
