/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import { registerNewUserProcess } from '../../controllers/users/user-controller';
import validateResource from '../../middlewares/validateResource';
import { userSchema } from '../../schemas/user-schema';

const router = Router();

// POST - Get new user Info and save it to the database
router.post('/signup', validateResource(userSchema), registerNewUserProcess);

// router.post('/login', loginUserProcess);

export default router;
