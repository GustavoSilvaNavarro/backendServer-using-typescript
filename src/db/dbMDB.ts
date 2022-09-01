import mongoose from 'mongoose';

import env from '../utils/env/variables-env';
import { AppErrors } from '../utils/errors/allErrors';

// DB CONNECTION
export const connectDB = async (): Promise<void> => {
  try {
    if (env.dbName !== undefined) {
      const db = await mongoose.connect(env.dbName);
      console.log(`DB is connected to ${db.connection.db.databaseName}`);
    } else {
      const err = new AppErrors('DB connection crushed', 500);
      throw err;
    }
  } catch (err) {
    if (err instanceof AppErrors) {
      console.log(err.message);
      process.exit(1);
    } else {
      console.log('Error detected when running the DB connection', err);
      process.exit(1);
    }
  }
};
