/* eslint-disable */
import App from './app';

require('dotenv').config({  
  path: '.env'
});

const app = new App(Number(process.env.SERVER_PORT) || 3000);

app.listen();
