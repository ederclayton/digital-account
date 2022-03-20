/* eslint-disable */
import App from '@/app';

require('module-alias/register');
const moduleAlias = require('module-alias');

moduleAlias.addAlias('@', __dirname);

const app = new App(3000);

app.listen();
