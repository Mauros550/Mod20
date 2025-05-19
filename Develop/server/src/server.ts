// Develop/server/src/server.ts
import path from 'path';
import { fileURLToPath } from 'url';
import express, { Request, Response } from 'express';
import db from './config/connection.js';
import router from './routes/index.js';  // changed import name

// Polyfill __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// All API and catch-all routes
app.use('/api', router);

// Serve static files from the React build
const clientDist = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDist));

// SPA catch-all for non-API routes
app.get(/^(?!\/api\/).*/, (_req: Request, res: Response) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

// 404 for bad API calls
app.use('/api/*', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'API route not found' });
});

// Start server after DB connection
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Server listening on port ${PORT}`);
  });
});
