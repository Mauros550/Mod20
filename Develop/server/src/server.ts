import path from 'path';
import express, { Request, Response } from 'express';
import db from './config/connection.js';
import apiRoutes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount your API routes at /api
app.use('/api', apiRoutes);

// Serve static assets from the React build
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// Catch-all: for any route not matched above, send back React's index.html
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

// Once DB is connected, start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Server listening on port ${PORT}`);
  });
});
