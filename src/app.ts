import 'dotenv/config';

import connectionToServer from './server/server';
import { connectDB } from './db/dbMDB';

// INITIALIZATIONS
const { app } = connectionToServer;
void connectDB();

// SERVER
app.listen(app.get('port'), () => {
  console.log(`Server on Port ${app.get('port')} - Worker: ${process.pid}`);
});
