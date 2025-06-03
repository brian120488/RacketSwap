import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const uri = process.env.DB_URI || "";
const client = new MongoClient(uri);

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { firstName, lastName, email, password } = await request.json();

    await client.connect();
    const database = client.db("test"); // Replace with your database name
    const collection = database.collection("users"); // Replace with your collection name

    // Check if the email already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email is already registered." }),
        { status: 400 }
      );
    }

    // Insert the new user into the collection
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await collection.insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ message: "User registered successfully.", result }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return new Response(
      JSON.stringify({ error: "Failed to connect to database." }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}