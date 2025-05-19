import fs from 'fs';
import path from 'path';
// side‐effect import to initialize Mongoose
import '../config/connection.js';
// @ts-ignore
import models from '../models/index.js';

async function seed() {
  try {
    // load JSON at runtime
    const filePath = path.join(__dirname, 'pythonQuestions.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const questions = JSON.parse(raw);

    // grab the Question model
    const Question = models['Question']!;

    // clear & re-insert
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
