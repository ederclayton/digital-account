import { Router } from 'express';
import accountRoutes from './account';
import transferRoutes from './transfer';

const routes = Router();

routes.use('/account', accountRoutes);
routes.use('/transfer', transferRoutes);

export default routes;
