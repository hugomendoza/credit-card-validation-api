import { CustomError } from '../errors/custom.error';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class TokenEntity {
  constructor(
    public id: string,
    public value: string,
    public card_holder: string,
    public brand: string,
    public last_four: string,
    public exp_month: string,
    public exp_year: string,
    public createdAt: Date,
    public expires_at: Date
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const {
      id,
      value,
      card_holder,
      brand,
      last_four,
      exp_month,
      exp_year,
      createdAt,
      expires_at,
    } = object;

    if (!id) {
      throw CustomError.badRequest('El id es obligatorio');
    }

    if (!value) {
      throw CustomError.badRequest('El número de la tarjeta es obligatorio');
    }

    if (!card_holder) {
      throw CustomError.badRequest(
        'El propietario de la tarjeta es obligatorio'
      );
    }

    if (!brand) {
      throw CustomError.badRequest('La marca de la tarjeta es obligatorio');
    }

    if (!last_four) {
      throw CustomError.badRequest(
        'Los últimos 4 dígitos de la tarjeta son obligatorios'
      );
    }

    if (!exp_month) {
      throw CustomError.badRequest(
        'El mes de expiración de la tarjeta es obligatorio'
      );
    }

    if (!exp_year) {
      throw CustomError.badRequest(
        'El año de expiración de la tarjeta es obligatorio'
      );
    }

    if (!createdAt) {
      throw CustomError.badRequest(
        'La fecha de creación de la tarjeta es obligatorio'
      );
    }

    if (!expires_at) {
      throw CustomError.badRequest(
        'La fecha de expiración de la tarjeta es obligatorio'
      );
    }

    return new TokenEntity(
      id,
      value,
      card_holder,
      brand,
      last_four,
      exp_month,
      exp_year,
      createdAt,
      expires_at
    );
  }
}
