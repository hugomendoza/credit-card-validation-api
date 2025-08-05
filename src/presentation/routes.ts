import { Router } from 'express';
import { TokenRoutes } from './token/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/v1/token', TokenRoutes.routes);
    return router;
  }
}
