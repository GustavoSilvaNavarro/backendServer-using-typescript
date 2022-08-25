import express, { Request, Response, NextFunction } from 'express';

//INITIALIZATIONS
const app = express();

//SETTINGS
app.set('port', process.env.PORT || 3000);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Everything good here, Hello World!!!');
});

app.get('/perro', (req: Request, res: Response, next: NextFunction) => {
  res.send('Habe perro');
});

//SERVER
app.listen(app.get('port'), () => {
  console.log('Server on Port', app.get('port'));
});