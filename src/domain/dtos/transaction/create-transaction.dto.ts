/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaymentType } from '@prisma/client';
import { regularExps } from '../../../config';

export class CreateTransactionDto {
  private constructor(
    public readonly amount_in_cents: number,
    public readonly currency: string,
    public readonly customer_email: string,
    public readonly reference: string,
    public readonly payment_method: {
      type: PaymentType;
      installments: number;
      token: string;
    }
  ) {}

  static create(props: {
    [key: string]: any;
  }): [string?, CreateTransactionDto?] {
    const {
      amount_in_cents,
      currency,
      customer_email,
      reference,
      payment_method,
    } = props;

    if (!currency) return ['La moneda es obligatoria'];
    if (currency !== 'COP')
      return ['El tipo de moneda debe ser COP (pesos colombianos)'];
    if (!amount_in_cents) return ['El monto es obligatorio'];
    if (amount_in_cents < 100000) {
      return [
        'El monto debe estar en centavos y debe ser superior a COP $.1000',
      ];
    }

    if (!customer_email) return ['El email del cliente es obligatorio'];
    if (!regularExps.email.test(customer_email))
      return ['El email no es válido'];

    if (!reference) return ['La referencia es obligatoria'];

    if (!payment_method)
      return ['La información del método de pago es obligatoria'];

    const { type, installments, token } = payment_method;

    if (!type) return ['El método de pago es obligatorio'];
    if (type !== 'CARD')
      return ['El método de pago debe ser tarjeta de crédito'];

    if (installments < 1) return ['El número de cuotas debe ser minimo 1'];
    if (!token) return ['El token es obligatorio'];

    return [
      undefined,
      new CreateTransactionDto(
        amount_in_cents,
        currency,
        customer_email,
        reference,
        {
          type,
          installments,
          token,
        }
      ),
    ];
  }
}
