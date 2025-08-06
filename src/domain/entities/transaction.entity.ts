import { TransactionStatus } from '@prisma/client';
import { CustomError } from '../errors/custom.error';
import { PaymentMethodEntity } from './payment-method.entity';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class TransactionEntity {
  constructor(
    public id: string,
    public amount_in_cents: number,
    public currency: string,
    public customer_email: string,
    public reference: string,
    public status: TransactionStatus,
    public paymentMethod: PaymentMethodEntity,
    public failure_code: string | null,
    public failure_message: string | null,
    public createdAt: string,
    public updatedAt: string
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const {
      id,
      amount_in_cents,
      currency,
      customer_email,
      reference,
      status,
      paymentMethod,
      failure_code,
      failure_message,
      createdAt,
      updatedAt,
    } = object;

    if (!id) {
      throw CustomError.badRequest('El id es obligatorio');
    }

    if (!amount_in_cents) {
      throw CustomError.badRequest('El monto es obligatorio');
    }

    if (!currency) {
      throw CustomError.badRequest(
        'La moneda de la transacción es obligatoria'
      );
    }

    if (!customer_email) {
      throw CustomError.badRequest('El email del cliente es obligatorio');
    }

    if (!reference) {
      throw CustomError.badRequest('La referencia es obligatoria');
    }

    if (!status) {
      throw CustomError.badRequest(
        'El estado de la transacción es obligatorio'
      );
    }

    if (!paymentMethod) {
      throw CustomError.badRequest(
        'El método de pago de la transacción es obligatorio'
      );
    }

    return new TransactionEntity(
      id,
      amount_in_cents,
      currency,
      customer_email,
      reference,
      status,
      paymentMethod,
      failure_code,
      failure_message,
      createdAt,
      updatedAt
    );
  }
}
