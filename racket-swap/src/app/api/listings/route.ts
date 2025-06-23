import { MongoClient } from "mongodb";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster84648.ynygdkm.mongodb.net`
const client = new MongoClient(uri);

export async function GET() {
  try {
    // Connect to the database
    await client.connect();
    const database = client.db("test"); 
    const collection = database.collection("listings");

    // Fetch all listings from the collection
    const listings = await collection.find({}).toArray();

    // Retrieve S3 image URLS
    const s3 = new S3Client({ region: process.env.AWS_REGION })
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: 'listings/badminton.jpg',
    });
    const url = await getSignedUrl(s3, command);
    listings[0].image = url;
    console.log(url);
    
    // Return the listings as a JSON response
    return new Response(
      JSON.stringify({ listings }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching listings:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch listings." }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function POST(request: Request) {
  try {
    console.log("hi");
    const { image, title, cost } = await request.json();

    // Connect to the database
    await client.connect();
    const database = client.db("test"); 
    const collection = database.collection("listings");

    // Insert listing to collection
    const listings = await collection.find({}).toArray();
    const result = await collection.insertOne({ image, title, cost });

    // Add image to S3
    const s3 = new S3Client({ region: process.env.AWS_REGION })
    const imageKey = `listings/${Date.now()}-${title.replace(/\s+/g, "-")}.jpg`; // Unique key for the image
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: imageKey,
      Body: Buffer.from(image, "base64"),
      ContentType: "image/jpeg",
    });
    await s3.send(command);

    // Return the listings as a JSON response
    return new Response(
      JSON.stringify({ listings }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error adding listing:", error);
    return new Response(
      JSON.stringify({ error: "Failed to add listing." }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}