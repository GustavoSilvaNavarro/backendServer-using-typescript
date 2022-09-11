import { Request, Response, NextFunction } from 'express';

import UserModel from '../../model/users-model';
import { UserType } from '../../types/ecomTypes';
import { AppErrors } from '../../utils/errors/allErrors';
import logger from '../../config/loggers/logger';

//! POST - Get new user Info and save it to the database
export const registerNewUserProcess = async (
  req: Request<Record<string, never>, Record<string, never>, UserType>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  logger.info(`${req.method} request to '${req.url}' route: Creating new User`);

  try {
    const userRegistered = await UserModel.findOne({ email: req.body.email });

    if (userRegistered) {
      const err = new AppErrors('User is already registered!', 409);
      throw err;
    }

    const { passwordConfirmation, ...user } = req.body;

    const newUser = new UserModel(user);
    await newUser.save();

    res.status(200).send('User was created');
  } catch (err) {
    next(err);
  }
};
