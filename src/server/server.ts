import express, { Application } from 'express';
import morgan from 'morgan';

import clientServices from '../routes/services-routes/service-api-routes';

// INITIALIZATIONS
const app: Application = express();

// SETTINGS
app.set('port', process.env.PORT !== undefined ? process.env.PORT : 3000);

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

// ROUTES
app.use('/api', clientServices);

// ERROR HANDLER

export default { app };
