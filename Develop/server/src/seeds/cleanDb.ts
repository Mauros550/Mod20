import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: 'Question', collectionName: string) => {
  try {
    // Assert that models[modelName] is defined
    const model = models[modelName]!;

    // Assert that model.db and model.db.db are defined
    const nativeDb = model.db!.db!;

    // check if the collection already exists
    const modelExists = await nativeDb
      .listCollections({ name: collectionName })
      .toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
};
