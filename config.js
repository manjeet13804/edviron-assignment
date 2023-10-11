const { MongoClient } = require('mongodb');
let cachedDb = null;
async function connectToDatabase() {
  console.log('Connected to MongoDB server');

  if (cachedDb) {
    return cachedDb;
  }

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(); // Access the default database

    cachedDb = db;
    return db;

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = {
  connectToDatabase,
};