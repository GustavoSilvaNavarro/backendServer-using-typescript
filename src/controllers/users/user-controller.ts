import { Request, Response, NextFunction } from 'express';

import UserModel from '../../model/users-model';

// POST - Get new user Info and save it to the database
export const registerNewUserProcess = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(200).send('User created');
  } catch (err) {
    next(err);
  }
};
