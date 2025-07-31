import { validateCard, validateDate } from '../../../config';

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
    if (!exp_month) return ['El mes de expiración es obligatorio'];
    if (!exp_year) return ['El año de expiración es obligatorio'];
    if (validateDate.validate(+`${exp_month}${exp_year}`))
      return ['El año de expiración es inválido'];
    if (!card_holder) return ['El titular de la tarjeta es obligatorio'];

    return [
      undefined,
      new CreateTokenDto(number, cvc, exp_month, exp_year, card_holder),
    ];
  }
}
