import { Router } from 'express';
import TransferController from '@/controllers/Transfer';

const routes = Router();

routes.get('/:accountId', TransferController.getTransfers.bind(TransferController));
routes.post('/', TransferController.createTransfer.bind(TransferController));

export default routes;
