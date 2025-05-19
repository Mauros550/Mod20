import path from 'path';
import { fileURLToPath } from 'url';
import express, { Request, Response } from 'express';
import db from './config/connection.js';
import apiRoutes from './routes/index.js';

// Polyfill __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRoutes);

// Serve React build
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Server listening on port ${PORT}`);
  });
});
