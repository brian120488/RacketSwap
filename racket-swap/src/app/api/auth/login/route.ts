import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { setCookie } from 'cookies-next/server';
import { NextRequest, NextResponse } from "next/server";  

const uri = process.env.DB_URI || "";
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    await client.connect();
    const database = client.db("test");
    const collection = database.collection("users"); 
    const user = await collection.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid password." },
        { status: 401 }
      );
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return NextResponse.json(
        { error: "Invalid password." },
        { status: 401 }
      );
    }

    const res = NextResponse.json(
      { message: "Login successful.", user },
      { status: 200 }
    );

    setCookie("authToken", true, {req, res});
    return res;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return NextResponse.json(
      { error: "Failed to connect to database." },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}