import { Router } from 'express';
import { TransactionService } from '../services/transaction.service';
import { TransactionController } from './controller';

export class TransactionRoutes {
  static get routes(): Router {
    const router = Router();
    const transactionService = new TransactionService();
    const controller = new TransactionController(transactionService);

    /**
     * @swagger
     * /api/v1/transactions:
     *   post:
     *     summary: Crea una nueva transacción
     *     tags: [Transacciones]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               amount_in_cents:
     *                 type: integer
     *                 description: Monto de la transacción en centavos. Debe ser mayor a 100000 (COP $1.000).
     *                 example: 150000
     *               currency:
     *                 type: string
     *                 description: Moneda de la transacción (solo se acepta COP).
     *                 example: "COP"
     *               customer_email:
     *                 type: string
     *                 format: email
     *                 description: Email del cliente.
     *                 example: "jane.doe@example.com"
     *               reference:
     *                 type: string
     *                 description: Referencia única para la transacción.
     *                 example: "unique_ref_12345"
     *               payment_method:
     *                 type: object
     *                 properties:
     *                   type:
     *                     type: string
     *                     description: Tipo de método de pago (solo se acepta CARD).
     *                     example: "CARD"
     *                   installments:
     *                     type: integer
     *                     description: Número de cuotas.
     *                     example: 1
     *                   token:
     *                     type: string
     *                     description: Token de la tarjeta generado previamente.
     *                     example: "tok_test_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4"
     *     responses:
     *       '201':
     *         description: Transacción creada exitosamente. El estado inicial es PENDING y se actualizará de forma asíncrona.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   description: ID único de la transacción.
     *                   example: "clx9..."
     *                 amount_in_cents:
     *                   type: integer
     *                   description: Monto de la transacción en centavos.
     *                   example: 150000
     *                 currency:
     *                   type: string
     *                   description: Moneda de la transacción.
     *                   example: "COP"
     *                 customer_email:
     *                   type: string
     *                   description: Email del cliente.
     *                   example: "jane.doe@example.com"
     *                 reference:
     *                   type: string
     *                   description: Referencia de la transacción.
     *                   example: "unique_ref_12345"
     *                 status:
     *                   type: string
     *                   description: Estado inicial de la transacción.
     *                   example: "PENDING"
     *                 paymentMethod:
     *                   type: object
     *                   description: Información del método de pago.
     *                 failure_code:
     *                   type: string
     *                   nullable: true
     *                   description: Código de fallo (si aplica).
     *                 failure_message:
     *                   type: string
     *                   nullable: true
     *                   description: Mensaje de fallo (si aplica).
     *                 createdAt:
     *                   type: string
     *                   format: date-time
     *                   description: Fecha de creación.
     *                 updatedAt:
     *                   type: string
     *                   format: date-time
     *                   description: Fecha de última actualización.
     *       '400':
     *         description: Error en los datos de la solicitud (ej. referencia duplicada, monto inválido).
     *       '404':
     *         description: El token de la tarjeta no fue encontrado.
     *       '500':
     *         description: Error interno del servidor.
     */
    router.post('/', controller.createTransaction);

    /**
     * @swagger
     * /api/v1/transactions/{id}:
     *   get:
     *     summary: Obtiene el estado de una transacción por ID
     *     tags: [Transacciones]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID único de la transacción a consultar.
     *     responses:
     *       '200':
     *         description: Estado de la transacción obtenido exitosamente.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   description: ID único de la transacción.
     *                   example: "clx9..."
     *                 amount_in_cents:
     *                   type: integer
     *                   description: Monto de la transacción en centavos.
     *                   example: 150000
     *                 currency:
     *                   type: string
     *                   description: Moneda de la transacción.
     *                   example: "COP"
     *                 customer_email:
     *                   type: string
     *                   description: Email del cliente.
     *                   example: "jane.doe@example.com"
     *                 reference:
     *                   type: string
     *                   description: Referencia de la transacción.
     *                   example: "unique_ref_12345"
     *                 status:
     *                   type: string
     *                   description: Estado actual de la transacción (PENDING, APPROVED, REJECTED).
     *                   example: "APPROVED"
     *                 failure_code:
     *                   type: string
     *                   nullable: true
     *                   description: Código de fallo si la transacción fue rechazada.
     *                   example: "FONDOS_INSUFIENTES"
     *                 failure_message:
     *                   type: string
     *                   nullable: true
     *                   description: Mensaje de fallo si la transacción fue rechazada.
     *                   example: "La tarjeta no tiene saldo suficiente para esta compra"
     *       '400':
     *         description: El ID de la transacción es inválido o no fue proporcionado.
     *       '404':
     *         description: La transacción no fue encontrada.
     *       '500':
     *         description: Error interno del servidor.
     */
    router.get('/:id', controller.getTransaction);
    return router;
  }
}
