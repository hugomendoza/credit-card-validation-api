import { Request, Response } from 'express';
import {
  CreateTransactionDto,
  CustomError,
  GetTransactionDto,
} from '../../domain';
import { TransactionService } from '../services/transaction.service';

export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  };

  createTransaction = (req: Request, res: Response) => {
    const [error, createTransactionDto] = CreateTransactionDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.transactionService
      .createTransaction(createTransactionDto!)
      .then((transaction) => res.status(201).json(transaction))
      .catch((error) => this.handleError(error, res));
  };

  getTransaction = (req: Request, res: Response) => {
    const [error, getTransactionDto] = GetTransactionDto.create(req.params);
    if (error) return res.status(400).json({ error });

    this.transactionService
      .getTransactionById(getTransactionDto!.id)
      .then((transaction) => res.status(200).json(transaction))
      .catch((error) => this.handleError(error, res));
  };
}
