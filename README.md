# API de Simulación de Tarjetas de Crédito

Esta es una API RESTful construida con Node.js, Express y TypeScript para simular la tokenización de tarjetas de crédito y el procesamiento de transacciones. Utiliza Prisma como ORM para interactuar con una base de datos PostgreSQL.

## ✨ Características

- **Tokenización Segura**: Convierte los datos de una tarjeta de crédito en un token seguro para transacciones futuras.
- **Validación de Tarjetas**:
  - Soporte para tarjetas **VISA** y **Mastercard**.
  - Validación de número de tarjeta mediante el **algoritmo de Luhn**.
  - Verificación de fecha de expiración.
- **Procesamiento de Transacciones**:
  - Creación de transacciones utilizando un token previamente generado.
  - Simulación de actualización de estado de transacción asíncrona (Aprobada/Rechazada).
- **Documentación de API**: Endpoints documentados con Swagger para facilitar su uso y prueba.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Base de Datos**: PostgreSQL
- **ORM**: Prisma
- **Contenerización**: Docker
- **Documentación**: Swagger (swagger-jsdoc, swagger-ui-express)

---

## 🚀 Empezando

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [Docker](https://www.docker.com/products/docker-desktop/)

### Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/hugomendoza/credit-card-validation-api.git
    cd credit-card-validation-api
    ```

2.  **Instala las dependencias del proyecto:**
    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**
    Renombre el archivo `.env.template` en la raíz del proyecto a `.env`, actuliza las variables de entorno.

    ```env
    # Puerto de la aplicación
    PORT=3000

    # Configuración de la base de datos PostgreSQL
    POSTGRES_USER=admin
    POSTGRES_PASSWORD=admin
    POSTGRES_DB=credit_card_db
    DATABASE_URL="postgresql://admin:admin@localhost:5432/credit_card_db"
    ```

4.  **Levanta la base de datos con Docker:**
    Este comando creará y ejecutará un contenedor de PostgreSQL.
    ```bash
    docker-compose up -d
    ```

5.  **Aplica las migraciones de la base de datos:**
    Prisma creará las tablas necesarias en la base de datos.
    ```bash
    npx prisma migrate dev
    ```

6.  **Inicia el servidor:**
    ```bash
    npm run dev
    ```

¡Listo! El servidor estará corriendo en `http://localhost:3000` (o el puerto que hayas configurado).

---

## 📄 Documentación de la API

La documentación completa de los endpoints está disponible a través de Swagger UI. Una vez que el servidor esté en funcionamiento, puedes acceder a ella en la siguiente URL:

**http://localhost:3000/api-docs**

### Endpoints Principales

- `POST /api/v1/token`: Tokeniza los datos de una tarjeta de crédito.
- `POST /api/v1/transactions`: Crea una nueva transacción utilizando un token.
- `GET /api/v1/transactions/:id`: Obtiene el estado de una transacción específica por su ID.

## 📜 Scripts Disponibles

- `npm run dev`: Inicia el servidor en modo de desarrollo con `nodemon`, que se reinicia automáticamente al detectar cambios.
- `npm run build`: Compila el código TypeScript a JavaScript en el directorio `dist`.
- `npm start`: Ejecuta el servidor en modo de producción. Primero compila el proyecto y luego lo inicia desde el directorio `dist`.

---
