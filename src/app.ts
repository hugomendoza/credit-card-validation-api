import { envs } from './config';
import { Server } from './presentation/server';
import { AppRoutes } from './presentation/routes';

function main() {
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });
  server.start();
}

(() => {
  main();
})();
