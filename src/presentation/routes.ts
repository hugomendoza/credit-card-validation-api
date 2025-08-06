import { Router } from 'express';
import { TokenRoutes } from './token/routes';
import { TransactionRoutes } from './transaction/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/v1/token', TokenRoutes.routes);
    router.use('/api/v1/transactions', TransactionRoutes.routes);
    return router;
  }
}
