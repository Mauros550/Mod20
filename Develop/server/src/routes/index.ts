// Develop/server/src/routes/index.ts
import type { Request, Response } from 'express';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import apiRoutes from './api/index.js';

const router = express.Router();

// Mount question routes directly at root of this router
// so server.ts's app.use('/api', router) makes
// GET /api/random work
router.use('/', apiRoutes);

// Serve React front-end for anything else
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
router.use((_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

export default router;
