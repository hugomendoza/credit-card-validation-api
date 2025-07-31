import { validateCard } from '../../../config';

export class CreateTokenDto {
  private constructor(
    public readonly number: string,
    public readonly cvc: string,
    public readonly exp_month: string,
    public readonly exp_year: string,
    public readonly card_holder: string
  ) {}

  static create(props: { [key: string]: string }): [string?, CreateTokenDto?] {
    const { number, cvc, exp_month, exp_year, card_holder } = props;
    if (!number) return ['El número de la tarjeta es obligatorio'];
    if (number.length < 16)
      return ['El número de la tarjeta debe tener al menos 16 caracteres'];
    if (!validateCard.validate(number))
      return ['El número de la tarjeta es inválido'];

    if (!cvc) return ['El cvc es obligatorio'];
    if (!/^\d{3,4}$/.test(cvc)) return ['El CVC debe tener 3 o 4 dígitos'];

    if (!exp_month) return ['El mes de expiración es obligatorio'];
    if (!/^\d{1,2}$/.test(exp_month) || +exp_month < 1 || +exp_month > 12) {
      return ['El mes de expiración debe ser un número válido entre 1 y 12'];
    }

    if (!exp_year) return ['El año de expiración es obligatorio'];
    if (!/^\d{2}$/.test(exp_year) && !/^\d{4}$/.test(exp_year)) {
      return ['El año de expiración debe tener 2 o 4 dígitos'];
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const fullExpYear = exp_year.length === 2 ? 2000 + +exp_year : +exp_year;

    if (
      fullExpYear < currentYear ||
      (fullExpYear === currentYear && +exp_month < currentMonth)
    ) {
      return ['La tarjeta ha expirado'];
    }

    if (!card_holder) return ['El titular de la tarjeta es obligatorio'];

    return [
      undefined,
      new CreateTokenDto(number, cvc, exp_month, exp_year, card_holder),
    ];
  }
}
