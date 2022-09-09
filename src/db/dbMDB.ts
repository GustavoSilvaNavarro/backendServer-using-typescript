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
      const err = new AppErrors('DB connection must received the connection link!', 500);
      throw err;
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
