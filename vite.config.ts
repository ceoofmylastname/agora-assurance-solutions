
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    {
      name: 'middleware',
      configureServer(server: any) {
        server.middlewares.use('/api', (req: any, res: any, next: any) => {
          if (req.url === '/api/webhooks/stripe') {
            let body = '';
            req.on('data', (chunk: any) => {
              body += chunk.toString();
            });
            req.on('end', () => {
              req.body = body;
              next();
            });
          } else {
            next();
          }
        });
      },
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  transformIndexHtml: (html: string) => {
    return html.replace(
      '<meta name="description" content="">',
      '<meta name="description" content="Get instant insurance quotes & expert guidance. Compare life insurance, mortgage protection, and annuity plans with personalized quotes in seconds. Zero confusion, total peace of mind.">'
    );
  },
});
