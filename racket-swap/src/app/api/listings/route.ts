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

    // Retrieve S3 image URLs for each listing
    const s3 = new S3Client({ region: process.env.AWS_REGION });
    const updatedListings = await Promise.all(
      listings.map(async (listing) => {
        const command = new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: listing.imageKey,
        });
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // URL valid for 1 hour
        return { title: listing.title, cost: listing.cost, image: url }; // Replace imageKey with signed URL
      })
    );

    // Return the listings with updated image URLs
    return new Response(
      JSON.stringify({ listings: updatedListings }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching listings:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch listings." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await client.close();
  }
}

export async function POST(request: Request) {
  try {
    const { image, title, cost } = await request.json();

    // Validate the incoming data
    if (!image || !title || !cost) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: image, title, or cost." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Connect to the database
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("listings");

    // Generate S3 image key
    const imageKey = `listings/${Date.now()}-${title.replace(/\s+/g, "-")}.jpg`;
    const base64Image = image.split(",")[1];

    // Upload image to S3
    const s3 = new S3Client({ region: process.env.AWS_REGION });
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: imageKey,
      Body: Buffer.from(base64Image, "base64"), // Assuming the image is sent as a base64 string
      ContentType: "image/jpeg",
    });
    await s3.send(command);

    // Insert listing into MongoDB
    const newListing = {
      title,
      cost,
      imageKey,
      createdAt: new Date(),
    };
    await collection.insertOne(newListing);

    // Return success response
    return new Response(
      JSON.stringify({ message: "Listing added successfully.", listing: newListing }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error adding listing:", error);
    return new Response(
      JSON.stringify({ error: "Failed to add listing." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await client.close();
  }
}