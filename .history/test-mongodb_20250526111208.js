// Test MongoDB connection
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://dixon:NJak4CpCvS66uKye@sautiboz.dn7kzla.mongodb.net/musichub?retryWrites=true&w=majority&appName=sautiboz';

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  family: 4,
};

async function testConnection() {
  let client;

  try {
    console.log('Attempting to connect to MongoDB...');
    client = new MongoClient(uri, options);

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
