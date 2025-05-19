import path from 'path';
import { fileURLToPath } from 'url';
import express, { Request, Response } from 'express';
import db from './config/connection.js';
import questionRoutes from './routes/api/questionRoutes.js';

// Polyfill __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// === API ROUTES ===
// Mount your question routes exactly at /api/questions
// so GET /api/questions/random goes to getRandomQuestions
app.use('/api/questions', questionRoutes);

// === STATIC FILES ===
// Serve the React build output
const clientDist = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDist));

// === SPA CATCH-ALL ===
// Any route NOT starting with /api/ should return index.html
app.get(/^(?!\/api\/).*/, (_req: Request, res: Response) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

// === 404 FOR OTHER API PATHS ===
// Optional: return JSON 404 for unmatched /api routes
app.use('/api/*', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'API route not found' });
});

// === START SERVER ===
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Server listening on port ${PORT}`);
  });
});
