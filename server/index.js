import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { seedDestinations } from "./data/seedDestinations.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const DB_NAME = process.env.DB_NAME || "rihlah";
const MONGODB_URI = process.env.MONGODB_URI;

// CORS setup supporting multiple comma-separated origins & local dev fallback
const rawAllowedOrigins = (process.env.CLIENT_URL || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!rawAllowedOrigins.includes("http://127.0.0.1:3000")) {
  rawAllowedOrigins.push("http://127.0.0.1:3000");
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        rawAllowedOrigins.includes("*") ||
        rawAllowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
  })
);

app.use(express.json({ limit: "100kb" }));

let mongoClientInstance = null;
let destinationCollection = null;
let metaCollection = null;
let dbStatus = {
  connected: false,
  message: "Initializing database connection...",
};

function escapeRegex(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sanitizeDestinationPayload(body, { isUpdate = false } = {}) {
  const allowedFields = [
    "name",
    "country",
    "category",
    "price",
    "duration",
    "departureDate",
    "imageUrl",
    "description",
    "halalDining",
    "prayerFacilities",
  ];

  const sanitized = {};
  for (const key of allowedFields) {
    if (body[key] !== undefined) {
      sanitized[key] = String(body[key]).trim();
    }
  }

  if (!isUpdate) {
    const required = [
      "name",
      "country",
      "category",
      "price",
      "duration",
      "departureDate",
      "imageUrl",
      "description",
    ];

    for (const field of required) {
      if (!sanitized[field]) {
        return { error: `Field '${field}' is required and cannot be empty.` };
      }
    }

    if (!sanitized.halalDining) {
      sanitized.halalDining = "100% Zabiha Halal Certified";
    }
    if (!sanitized.prayerFacilities) {
      sanitized.prayerFacilities = "Nearby Masjid & Prayer-Conscious Schedule";
    }
  }

  // Validate imageUrl if present
  if (sanitized.imageUrl) {
    const isRelative = sanitized.imageUrl.startsWith("/");
    const isHttp = /^https?:\/\//i.test(sanitized.imageUrl);
    if (!isRelative && !isHttp) {
      return {
        error:
          "Image URL must be a valid relative path (e.g. /images/istanbul.jpg) or full http/https URL.",
      };
    }
  }

  return { data: sanitized };
}

async function connectToMongoDB() {
  if (!MONGODB_URI || MONGODB_URI.includes("<username>")) {
    dbStatus = {
      connected: false,
      message:
        "MONGODB_URI is not configured. Copy server/.env.example to server/.env and add your MongoDB Atlas URI.",
    };
    console.warn(`[DB] ${dbStatus.message}`);
    return;
  }

  try {
    mongoClientInstance = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    await mongoClientInstance.connect();
    const db = mongoClientInstance.db(DB_NAME);
    destinationCollection = db.collection("destinations");
    metaCollection = db.collection("meta");

    // Ensure category index for performant filtering
    await destinationCollection.createIndex({ category: 1 });

    // Auto-seed once on very first empty database connection
    const alreadySeeded = await metaCollection.findOne({ _id: "initial_seed" });
    const count = await destinationCollection.countDocuments();

    if (!alreadySeeded && count === 0) {
      const seeded = await destinationCollection.insertMany(seedDestinations);
      await metaCollection.insertOne({
        _id: "initial_seed",
        seededAt: new Date().toISOString(),
        count: seeded.insertedCount,
      });
      console.log(
        `[DB] Auto-seeded ${seeded.insertedCount} curated Halal destinations into "${DB_NAME}.destinations".`
      );
    }

    dbStatus = {
      connected: true,
      message: `Connected to MongoDB database "${DB_NAME}"`,
    };
    console.log(`[DB] ${dbStatus.message}`);
  } catch (err) {
    dbStatus = {
      connected: false,
      message: err instanceof Error ? err.message : "Failed to connect to MongoDB",
    };
    console.error("[DB] Connection error:", dbStatus.message);
  }
}

function requireDatabase(req, res, next) {
  if (!destinationCollection) {
    return res.status(503).json({
      error: "Database unavailable",
      details: dbStatus.message,
    });
  }
  next();
}

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Rihlah Halal Tourism Server is running!",
    status: "ok",
    database: dbStatus,
  });
});

// Create a new Halal destination package
app.post("/add-destination", requireDatabase, async (req, res) => {
  try {
    const { data, error } = sanitizeDestinationPayload(req.body, {
      isUpdate: false,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    const newDestination = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    const result = await destinationCollection.insertOne(newDestination);
    res.status(201).json({
      ...result,
      insertedDestination: newDestination,
    });
  } catch (error) {
    console.error("Error adding destination:", error);
    res.status(500).json({ error: "Failed to add destination" });
  }
});

// Get all destinations (with safe regex search, category, and maxPrice filters)
app.get("/destinations", requireDatabase, async (req, res) => {
  try {
    const { category, search, maxPrice, sort } = req.query;
    const query = {};

    if (category && category !== "All") {
      query.category = String(category).trim();
    }

    if (search && String(search).trim() !== "") {
      const safeTerm = escapeRegex(String(search).trim());
      query.$or = [
        { name: { $regex: safeTerm, $options: "i" } },
        { country: { $regex: safeTerm, $options: "i" } },
        { category: { $regex: safeTerm, $options: "i" } },
        { description: { $regex: safeTerm, $options: "i" } },
      ];
    }

    let destinations = await destinationCollection.find(query).toArray();

    // Server-side maxPrice filtering if requested
    if (maxPrice && !Number.isNaN(Number(maxPrice))) {
      const budgetLimit = Number(maxPrice);
      destinations = destinations.filter(
        (dest) => Number(dest.price) <= budgetLimit
      );
    }

    // Optional server-side sorting
    if (sort === "price_asc") {
      destinations.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sort === "price_desc") {
      destinations.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sort === "newest") {
      destinations.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      );
    }

    res.json(destinations);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    res.status(500).json({ error: "Failed to fetch destinations" });
  }
});

// Get single destination by id
app.get("/destination/:id", requireDatabase, async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid destination ID format" });
    }

    const result = await destinationCollection.findOne({ _id: new ObjectId(id) });
    if (!result) {
      return res.status(404).json({ error: "Destination not found" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching destination:", error);
    res.status(500).json({ error: "Failed to fetch destination" });
  }
});

// Update destination by id
app.patch("/destination/:id", requireDatabase, async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid destination ID format" });
    }

    const { data, error } = sanitizeDestinationPayload(req.body, {
      isUpdate: true,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: "No valid destination fields to update." });
    }

    const result = await destinationCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date().toISOString() } },
      { returnDocument: "after" }
    );

    if (!result) {
      return res.status(404).json({ error: "Destination not found" });
    }

    res.json({
      acknowledged: true,
      updatedDestination: result,
    });
  } catch (error) {
    console.error("Error updating destination:", error);
    res.status(500).json({ error: "Failed to update destination" });
  }
});

// Delete destination by id
app.delete("/destination/:id", requireDatabase, async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid destination ID format" });
    }

    const result = await destinationCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Destination not found" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error deleting destination:", error);
    res.status(500).json({ error: "Failed to delete destination" });
  }
});

// Start express server and connect to MongoDB asynchronously
app.listen(PORT, () => {
  console.log(`Rihlah server is running at http://localhost:${PORT}`);
  connectToMongoDB().catch((err) =>
    console.error("[DB] Background connection error:", err)
  );
});

// Graceful shutdown
const shutdown = async () => {
  if (mongoClientInstance) {
    try {
      await mongoClientInstance.close();
      console.log("[DB] MongoDB connection closed cleanly.");
    } catch (e) {
      console.error("[DB] Error closing connection:", e);
    }
  }
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
