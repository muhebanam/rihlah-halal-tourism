import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MongoClient } from "mongodb";
import { seedDestinations } from "./data/seedDestinations.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "rihlah";

if (!uri || uri.includes("<username>")) {
  console.error(
    "Missing or placeholder MONGODB_URI in server/.env. Copy server/.env.example to server/.env and add your MongoDB connection string."
  );
  process.exit(1);
}

const client = new MongoClient(uri);

async function runSeed() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const destinationCollection = db.collection("destinations");
    const metaCollection = db.collection("meta");

    const existingCount = await destinationCollection.countDocuments();
    if (existingCount > 0) {
      console.log(
        `Database already has ${existingCount} destination(s). Clearing and re-seeding with 6 curated Halal destinations...`
      );
      await destinationCollection.deleteMany({});
    }

    const result = await destinationCollection.insertMany(seedDestinations);
    await metaCollection.updateOne(
      { _id: "initial_seed" },
      { $set: { seededAt: new Date().toISOString(), count: result.insertedCount } },
      { upsert: true }
    );

    console.log(
      `Seeded ${result.insertedCount} Islamic & Halal destinations into "${dbName}.destinations".`
    );
  } catch (error) {
    console.error("Failed to seed database:", error);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

runSeed();

