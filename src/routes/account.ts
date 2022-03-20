import { Router } from 'express';
import AccountController from '@/controllers/Account';

const routes = Router();

routes.post('/', AccountController.createAccount);

export default routes;
