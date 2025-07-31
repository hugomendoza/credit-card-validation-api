import { Request, Response } from 'express';
import { CreateTokenDto, CustomError } from '../../domain';
import { TokenService } from '../services/token.service';

export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  };

  createToken = (req: Request, res: Response) => {
    const [error, createTokenDto] = CreateTokenDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.tokenService
      .createToken(createTokenDto!)
      .then((token) => res.status(201).json(token))
      .catch((error) => this.handleError(error, res));
  };
}
