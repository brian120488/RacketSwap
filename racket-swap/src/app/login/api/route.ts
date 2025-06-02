import { MongoClient } from 'mongodb';

const uri = process.env.DB_URI || "";
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const database = client.db('sample_airbnb'); // Replace with your database name
    const collection = database.collection('listingsAndReviews'); // Replace with your collection name

    const data = await collection.find({}).toArray(); // Example query to fetch all documents

    return Response.json({ data });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return Response.json({ error: 'Failed to connect to database' }, { status: 500 });
  } finally {
    await client.close();
  }
}