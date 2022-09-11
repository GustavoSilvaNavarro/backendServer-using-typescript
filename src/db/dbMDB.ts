import mongoose from 'mongoose';

import env from '../utils/env/variables-env';
import logger from '../config/loggers/logger';
import { AppErrors } from '../utils/errors/allErrors';

// DB CONNECTION
export const connectDB = async (): Promise<void> => {
  try {
    if (env.dbName !== undefined) {
      const db = await mongoose.connect(env.dbName);
      logger.info(`DB is connected to ${db.connection.db.databaseName}`);
    } else {
      const err = new AppErrors('DB connection must received the connection link!', 500);
      throw err;
    }
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};
