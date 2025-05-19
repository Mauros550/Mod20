import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Polyfill __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// side-effect import to connect mongoose
import '../config/connection.js';
// @ts-ignore
import models from '../models/index.js';

async function seed() {
  try {
    // JSON lives in your source tree, not in dist.
    const filePath = path.join(__dirname, '../../src/seeds/pythonQuestions.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const questions = JSON.parse(raw);

    const Question = models['Question']!;
    await Question.deleteMany({});
    await Question.insertMany(questions);

    console.log(`🌱 Seeded ${questions.length} questions.`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed', err);
    process.exit(1);
  }
}

seed();
