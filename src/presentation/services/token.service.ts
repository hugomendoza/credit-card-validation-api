import { randomBytes } from 'crypto';
import { prisma } from '../../data/postgres-db';
import { CreateTokenDto, CustomError, TokenEntity } from '../../domain';
import { regularExps } from '../../config';

export class TokenService {
  constructor() {}

  private getCardBrand(cardNumber: string): string {
    for (const [brand, pattern] of Object.entries(regularExps.cards)) {
      if (pattern.test(cardNumber)) {
        return brand;
      }
    }
    throw CustomError.badRequest('Solo se aceptan tarjetas VISA y Mastercard');
  }

  async createToken(createTokenDto: CreateTokenDto): Promise<TokenEntity> {
    try {
      const tokenValue = `tok_test_${randomBytes(16).toString('hex')}`;
      const lastFour = createTokenDto.value.slice(-4);
      const brand = this.getCardBrand(createTokenDto.value);

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
      if (error instanceof CustomError) {
        throw error;
      }
      console.error(error);
      throw CustomError.internalServer('Error interno del servidor');
    }
  }
}
