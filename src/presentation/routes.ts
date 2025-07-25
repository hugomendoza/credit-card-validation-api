import { Router } from 'express';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    // Cambiamos .use por .get para definir un endpoint GET
    router.get('/api/todos', (req, res) => {
      // Devolvemos una respuesta más representativa para un API
      res.json([
        { id: 1, text: 'Validate credit cards', completedAt: new Date() },
        { id: 2, text: 'Check Luhn algorithm', completedAt: null },
      ]);
    });
    return router;
  }
}
