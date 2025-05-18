import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: 'Question', collectionName: string) => {
  try {
    // We know models[modelName] exists, so assert with "!"
    const model = models[modelName]!;

    // drill down to the native MongoDB driver
    const nativeDb = model.db.db;

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
