import { Router } from 'express';
import accountRoutes from '@/routes/account';
import transactionRoutes from '@/routes/transaction';

const routes = Router();

routes.use('/api/account', accountRoutes);
routes.use('/api/transaction', transactionRoutes);

export default routes;
