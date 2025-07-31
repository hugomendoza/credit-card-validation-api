import { randomBytes } from 'crypto';
import { prisma } from '../../data/postgres-db';
import { CreateTokenDto, CustomError, TokenEntity } from '../../domain';

export class TokenService {
  constructor() {}

  private getCardBrand(cardNumber: string): string {
    if (/^4/.test(cardNumber)) {
      return 'VISA';
    }
    if (/^5[1-5]/.test(cardNumber)) {
      return 'MASTERCARD';
    }
    return 'UNKNOWN';
  }

  async createToken(createTokenDto: CreateTokenDto): Promise<TokenEntity> {
    try {
      const tokenValue = `tok_test_${randomBytes(16).toString('hex')}`;
      const lastFour = createTokenDto.number.slice(-4);
      const brand = this.getCardBrand(createTokenDto.number);

      const tokenData = await prisma.token.create({
        data: {
          value: tokenValue,
          last_four: lastFour,
          brand: brand,
          card_holder: createTokenDto.card_holder,
          exp_month: createTokenDto.exp_month,
          exp_year: createTokenDto.exp_year,
        },
      });

      return TokenEntity.fromObject(tokenData);
    } catch (error) {
      console.error(error);
      throw CustomError.internalServer(`${error}`);
    }
  }
}
