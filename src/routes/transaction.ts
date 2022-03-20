import { Router, Request, Response } from 'express';
import logging from '@/config/logging';

const routes = Router();

routes.post('/', (req: Request, res: Response) => {
  logging.info('Route', 'GCREATE ACCOUNT');
  res.json({ message: 'Conta criada' });
});

export default routes;
