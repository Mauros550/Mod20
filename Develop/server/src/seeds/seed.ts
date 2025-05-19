import fs from 'fs';
import path from 'path';

// Side‐effect import to initialize your DB connection
import '../config/connection.js';
// @ts-ignore - we know this JS file exists
import models from '../models/index.js';

async function seed() {
  try {
    const filePath = path.join(__dirname, 'pythonQuestions.json');
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
