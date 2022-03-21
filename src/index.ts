/* eslint-disable */
import App from '@/app';

require('dotenv').config({  
  path: '.env'
});

require('module-alias/register');
const moduleAlias = require('module-alias');

moduleAlias.addAlias('@', __dirname);

const app = new App(Number(process.env.SERVER_PORT) || 3000);

app.listen();
