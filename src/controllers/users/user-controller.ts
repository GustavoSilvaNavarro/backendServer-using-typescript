import { Request, Response, NextFunction } from 'express';

import UserModel from '../../model/users-model';
import sendEmail from '../../utils/mails/mailer';
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

    const contentMessage = `
      <h1>Welcome ${newUser.firstName} ${newUser.lastName}!</h1>
      <p>Your New Account has been setup!</p>
      <p>Your info account is</p>
      <ul>
        <li>User ID: ${newUser._id}</li>
        <li>User email: ${newUser.email}</li>
        <li>Contact: ${newUser.cellphone}</li>
      </ul>
    `;

    await sendEmail({
      from: 'test@gmail.com',
      to: newUser.email,
      subject: 'Please verify your account',
      text: contentMessage,
    });

    res.status(200).send('User was created');
  } catch (err) {
    next(err);
  }
};
