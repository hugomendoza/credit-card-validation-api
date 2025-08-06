import { PaymentType } from '@prisma/client';
import { CustomError } from '../errors/custom.error';
import { TokenEntity } from './token.entity';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class PaymentMethodEntity {
  constructor(
    public id: string,
    public type: PaymentType,
    public installments: number,
    public transactionId: string,
    public token: TokenEntity
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, type, installments, transactionId, token } = object;

    if (!id) {
      throw CustomError.badRequest('El id es obligatorio');
    }

    if (!type) {
      throw CustomError.badRequest('Falta el método de pago');
    }

    if (!installments) {
      throw CustomError.badRequest('El número de cuotas es obligatorio');
    }

    if (!transactionId) {
      throw CustomError.badRequest('El id de la transacción es obligatorio');
    }

    if (!token) {
      throw CustomError.badRequest(
        'La información de la tarjeta es obligatoria'
      );
    }

    return new PaymentMethodEntity(
      id,
      type,
      installments,
      transactionId,
      TokenEntity.fromObject(token)
    );
  }
}
