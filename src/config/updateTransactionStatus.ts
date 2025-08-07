import { prisma } from '../data/postgres-db';
import { CustomError } from '../domain';
import { delay } from './delay';

export async function updateTransactionStatus(transactioId: string) {
  await delay(10000);
  const random = Math.random();
  try {
    if (random < 0.5) {
      await prisma.transaction.update({
        where: { id: transactioId },
        data: { status: 'APPROVED', failure_code: null, failure_message: null },
      });
    } else {
      await prisma.transaction.update({
        where: { id: transactioId },
        data: {
          status: 'REJECTED',
          failure_code: 'FONDOS_INSUFIENTES',
          failure_message:
            'La tarjeta no tiene saldo suficiente para esta compra',
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw CustomError.internalServer(`${error}`);
  }
}
