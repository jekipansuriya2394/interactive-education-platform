import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Custom Vite plugin to handle local data synchronization across devices/tabs
function localSyncPlugin() {
  const dataPath = path.resolve(__dirname, 'src/data/sync_data.json');

  // Initialize sync file if it doesn't exist
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(path.dirname(dataPath), { recursive: true });
    fs.writeFileSync(dataPath, JSON.stringify({}));
  }

  return {
    name: 'local-sync-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Strip query params if any
        const urlPath = req.url.split('?')[0];
        
        if (urlPath === '/api/sync-data') {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          
          if (req.method === 'OPTIONS') {
            res.statusCode = 200;
            res.end();
            return;
          }

          if (req.method === 'GET') {
            res.setHeader('Content-Type', 'application/json');
            try {
              const data = fs.readFileSync(dataPath, 'utf-8');
              res.end(data);
            } catch {
              res.end(JSON.stringify({}));
            }
            return;
          }

          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body);
                let existing = {};
                try {
                  if (fs.existsSync(dataPath)) {
                    existing = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
                  }
                } catch {}
                const merged = { ...existing, ...parsed };
                fs.writeFileSync(dataPath, JSON.stringify(merged, null, 2), 'utf-8');
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
              } catch (e) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
              }
            });
            return;
          }
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), localSyncPlugin()],
})
