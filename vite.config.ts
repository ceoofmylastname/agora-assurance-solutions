
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { ViteDevServer } from "vite";
import type { IncomingMessage, ServerResponse } from "http";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    {
      name: 'configure-cache-control-headers',
      configureServer(server: ViteDevServer) {
        server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
          // For hashed assets (containing a hash in the filename)
          if (req.url && (
              /\.[a-zA-Z0-9]{8,}\.(js|css)$/.test(req.url) || // Hashed JS/CSS files
              /\/lovable-uploads\/[a-zA-Z0-9-]+\.(png|jpg|jpeg|webp|svg|gif)$/.test(req.url) // Uploaded assets with UUIDs
            )) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          } 
          // For non-hashed static assets
          else if (req.url && /\.(js|css|png|jpg|jpeg|webp|svg|gif|ico|woff|woff2|ttf|eot)$/.test(req.url)) {
            res.setHeader('Cache-Control', 'public, max-age=604800'); // 7 days
          }
          next();
        });
      },
      transformIndexHtml(html: string) {
        // This ensures the plugin runs during build as well
        return html;
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Ensure assets are properly hashed for cache busting
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
}));
