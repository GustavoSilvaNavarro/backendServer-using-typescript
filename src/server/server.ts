import express, { Request, Response, NextFunction, Application } from 'express';

// INITIALIZATIONS
const app: Application = express();

// SETTINGS
app.set('port', 3000);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('It is fucking working');
});

export default { app };
