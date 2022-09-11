import express, { Application } from 'express';
import morgan from 'morgan';

import userRoutes from '../routes/user-routes/user-routes';
import clientServices from '../routes/services-routes/service-api-routes';
import { allErrorHandler, notFoundPage } from '../middlewares/error-handler';

// INITIALIZATIONS
const app: Application = express();

// SETTINGS
app.set('port', process.env.PORT !== undefined ? process.env.PORT : 3000);

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

// ROUTES
app.use('/', userRoutes);
app.use('/api', clientServices);

app.use('*', notFoundPage);

// ERROR HANDLER
app.use(allErrorHandler);

export default { app };
