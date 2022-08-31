import 'dotenv/config';
import connectionToServer from './server/server';

// INITIALIZATIONS
const { app } = connectionToServer;

// SERVER
app.listen(app.get('port'), () => {
  console.log('Server on Port', app.get('port'));
});
