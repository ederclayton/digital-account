import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as bodyParser from 'body-parser';

import logging from '@/config/logging';
import routes from '@/routes';

class App {
  public app: Application;

  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeDatabase() {
    mongoose
      .connect(process.env.MONGO_URI || '')
      .then(() => {
        logging.info('Server', 'Mongo Connected');
      })
      .catch(error => {
        logging.error('Server', error.message, error);
      });
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
  }

  private initializeRoutes() {
    this.app.use('/api', routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      logging.info('Server', `App listening on the port ${this.port}`);
    });
  }
}

export default App;
