import { updateTransactionStatus } from '../../config';
import { prisma } from '../../data/postgres-db';
import {
  CreateTransactionDto,
  CustomError,
  TransactionEntity,
} from '../../domain';

export class TransactionService {
  constructor() {}

  async createTransaction(
    createTransactionDto: CreateTransactionDto
  ): Promise<TransactionEntity> {
    const {
      amount_in_cents,
      currency,
      customer_email,
      reference,
      payment_method,
    } = createTransactionDto;

    const { installments, token, type } = payment_method;

    const validToken = await prisma.token.findUnique({
      where: {
        value: token,
      },
    });

    const existReference = await prisma.transaction.findUnique({
      where: {
        reference: reference,
      },
    });

    if (!validToken) {
      throw CustomError.notFound('El token no existe');
    }

    if (existReference) {
      throw CustomError.badRequest('La referencia ya existe');
    }

    try {
      const newTransaction = await prisma.transaction.create({
        data: {
          amount_in_cents,
          currency,
          customer_email,
          reference,
          paymentMethod: {
            create: {
              type,
              installments,
              token: {
                connect: {
                  id: validToken.id,
                },
              },
            },
          },
        },
        include: {
          paymentMethod: { include: { token: true } },
        },
      });

      await updateTransactionStatus(newTransaction.id);

      return TransactionEntity.fromObject(newTransaction);
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer(`${error}`);
    }
  }
}
