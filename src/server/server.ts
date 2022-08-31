import express, { Request, Response, NextFunction, Application } from 'express';
import morgan from 'morgan';

// INITIALIZATIONS
const app: Application = express();

// SETTINGS
app.set('port', process.env.PORT !== undefined ? process.env.PORT : 3000);

app.use(morgan('dev'));

app.get('/', (_req: Request, res: Response, _next: NextFunction) => {
  res.send('It is fucking working');
});

export default { app };
