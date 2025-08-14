import swaggerJSDoc from 'swagger-jsdoc';
import { envs } from './envs';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API para simular la validación de tarjetas de crédito',
    version: '1.0.0',
    description:
      'Documentación de la API para simular la validación de tarjetas de crédito',
  },
  servers: [
    {
      url: `http://localhost:${envs.PORT}`,
      description: 'Servidor de desarrollo',
    },
  ],
  tags: [
    {
      name: 'Token',
      description: 'Endpoints para tokenizar tarjetas de crédito',
    },
    {
      name: 'Transacciones',
      description: 'Endpoints para administrar transacciones',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/presentation/**/routes.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
