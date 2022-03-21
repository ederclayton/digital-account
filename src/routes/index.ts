import { Router } from 'express';
import accountRoutes from '@/routes/account';
import transferRoutes from '@/routes/transfer';

const routes = Router();

routes.use('/account', accountRoutes);
routes.use('/transfer', transferRoutes);

export default routes;
