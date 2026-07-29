import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { forwardApiRequest } from './src/server/api-client';

function apiAccessMiddleware(): Plugin {
  return {
    name: 'api-access-middleware',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '');
      const apiBaseUrl = env.API_BASE_URL ?? 'http://localhost:3000';
      const apiKey = env.API_KEY ?? '';

      server.middlewares.use('/api', (req, res) => {
        void forwardApiRequest({
          apiBaseUrl,
          apiKey,
          req,
          res,
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const port = Number(env.APP_PORT ?? 3001);

  return {
    plugins: [react(), apiAccessMiddleware()],
    server: {
      port,
    },
    preview: {
      port,
    },
  };
});
