const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

export async function connectToDatabase() {
  try {
    const connectedClient = await client;
    const database = connectedClient.db('E-Commerce');
    const products = database.collection('products');
    const users = database.collection('users');
    const userData = database.collection('userData');
        return { client: connectedClient, products , users , userData };
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw error;
  }
}


