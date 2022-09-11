/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import { registerNewUserProcess } from '../../controllers/users/user-controller';

const router = Router();

// POST - Get new user Info and save it to the database
router.post('/signup', registerNewUserProcess);

// router.post('/login', loginUserProcess);

export default router;
