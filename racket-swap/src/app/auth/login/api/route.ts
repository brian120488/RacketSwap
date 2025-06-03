import { MongoClient } from "mongodb";

const uri = process.env.DB_URI || "";
const client = new MongoClient(uri);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required." }),
        { status: 400 }
      );
    }

    await client.connect();
    const database = client.db("test");
    const collection = database.collection("users"); 

    const user = await collection.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found." }),
        { status: 404 }
      );
    }

    if (user.password !== password) {
      return new Response(
        JSON.stringify({ error: "Invalid password." }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Login successful.", user }),
      { status: 200 }
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