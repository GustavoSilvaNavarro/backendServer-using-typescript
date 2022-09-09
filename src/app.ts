import 'dotenv/config';

import connectionToServer from './server/server';
import logger from './config/loggers/logger';
import { connectDB } from './db/dbMDB';

// INITIALIZATIONS
const { app } = connectionToServer;
void connectDB();

// SERVER
app.listen(app.get('port'), () => {
  logger.info(`Server on Port ${app.get('port')} - Worker: ${process.pid}`);
});
