import { Router } from 'express';
import { TransactionService } from '../services/transaction.service';
import { TransactionController } from './controller';

export class TransactionRoutes {
  static get routes(): Router {
    const router = Router();
    const transactionService = new TransactionService();
    const controller = new TransactionController(transactionService);

    router.post('/', controller.createTransaction);
    return router;
  }
}
