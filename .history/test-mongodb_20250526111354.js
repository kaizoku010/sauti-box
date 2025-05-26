// Test MongoDB connection
const { MongoClient } = require('mongodb');

// Try different connection string formats
const uriSRV = 'mongodb+srv://dixon:NJak4CpCvS66uKye@sautiboz.dn7kzla.mongodb.net/musichub?retryWrites=true&w=majority&appName=sautiboz';
const uriDirect = 'mongodb://dixon:NJak4CpCvS66uKye@sautiboz-shard-00-00.dn7kzla.mongodb.net:27017,sautiboz-shard-00-01.dn7kzla.mongodb.net:27017,sautiboz-shard-00-02.dn7kzla.mongodb.net:27017/musichub?ssl=true&replicaSet=atlas-default-shard-0&authSource=admin&retryWrites=true&w=majority';

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  family: 4,
};

async function testConnection() {
  let client;

  // Try SRV connection first
  try {
    console.log('Attempting to connect to MongoDB using SRV...');
    client = new MongoClient(uriSRV, options);

    await client.connect();
    console.log('✅ Successfully connected to MongoDB!');

    // Test database access
    const db = client.db('musichub');
    const collections = await db.listCollections().toArray();
    console.log('📁 Available collections:', collections.map(c => c.name));

    // Test a simple operation
    const testCollection = db.collection('test');
    await testCollection.insertOne({ test: true, timestamp: new Date() });
    console.log('✅ Successfully performed test operation!');

    // Clean up test document
    await testCollection.deleteOne({ test: true });
    console.log('🧹 Cleaned up test document');

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('Error details:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Connection closed');
    }
  }
}

testConnection();
