import { Router } from 'express';
import { TokenService } from '../services/token.service';
import { TokenController } from './controller';

export class TokenRoutes {
  static get routes(): Router {
    const router = Router();
    const tokenService = new TokenService();
    const controller = new TokenController(tokenService);

    router.post('/', controller.createToken);
    return router;
  }
}
