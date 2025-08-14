import { Router } from 'express';
import { TokenService } from '../services/token.service';
import { TokenController } from './controller';

export class TokenRoutes {
  static get routes(): Router {
    const router = Router();
    const tokenService = new TokenService();
    const controller = new TokenController(tokenService);

    /**
     * @swagger
     * /api/v1/token:
     *   post:
     *     summary: Tokeniza una tarjeta de crédito
     *     tags: [Token]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               value:
     *                 type: string
     *                 description: Número de la tarjeta de crédito (16 dígitos).
     *                 example: "4242424242424242"
     *               cvc:
     *                 type: string
     *                 description: Código de seguridad de la tarjeta (3 o 4 dígitos).
     *                 example: "123"
     *               exp_month:
     *                 type: string
     *                 description: Mes de expiración de la tarjeta (1-12).
     *                 example: "12"
     *               exp_year:
     *                 type: string
     *                 description: Año de expiración de la tarjeta (2 o 4 dígitos).
     *                 example: "25"
     *               card_holder:
     *                 type: string
     *                 description: Nombre del titular de la tarjeta.
     *                 example: "John Doe"
     *     responses:
     *       '201':
     *         description: Tarjeta tokenizada exitosamente.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   description: ID único del token en la base de datos.
     *                   example: "clx5k..."
     *                 value:
     *                   type: string
     *                   description: El token generado para la tarjeta.
     *                   example: "tok_test_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4"
     *                 card_holder:
     *                   type: string
     *                   description: Nombre del titular de la tarjeta.
     *                   example: "John Doe"
     *                 brand:
     *                   type: string
     *                   description: Marca de la tarjeta (VISA, MASTERCARD).
     *                   example: "VISA"
     *                 last_four:
     *                   type: string
     *                   description: Últimos cuatro dígitos de la tarjeta.
     *                   example: "4242"
     *                 exp_month:
     *                   type: string
     *                   description: Mes de expiración.
     *                   example: "12"
     *                 exp_year:
     *                   type: string
     *                   description: Año de expiración.
     *                   example: "25"
     *                 createdAt:
     *                   type: string
     *                   format: date-time
     *                   description: Fecha de creación del token.
     *       '400':
     *         description: Error de validación en los datos de la tarjeta.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Mensaje de error detallado.
     *                   examples:
     *                     invalidCard:
     *                       summary: Número de tarjeta inválido
     *                       value: "El número de la tarjeta es inválido"
     *                     expiredCard:
     *                       summary: Tarjeta expirada
     *                       value: "La tarjeta ha expirado"
     *                     unsupportedBrand:
     *                       summary: Marca no soportada
     *                       value: "Solo se aceptan tarjetas VISA y Mastercard"
     *                     missingField:
     *                       summary: Campo faltante
     *                       value: "El titular de la tarjeta es obligatorio"
     *       '500':
     *         description: Error interno del servidor.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Internal server error"
     */
    router.post('/', controller.createToken);
    return router;
  }
}
