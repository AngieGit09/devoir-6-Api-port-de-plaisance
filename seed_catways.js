require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Catway = require("./models/catway");

(async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI manquant dans .env");
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 });

    const jsonPath = path.resolve(__dirname, "data", "CatWays.json");
    const raw = fs.readFileSync(jsonPath, "utf-8");
    let data = JSON.parse(raw);
    if (!Array.isArray(data)) data = [data];

    await Catway.deleteMany({});
    await Catway.insertMany(data);

    const n = await Catway.countDocuments();
    console.log(`Import OK: ${n} documents dans "catways"`);
    process.exit(0);
  } catch (e) {
    console.error("Seed échoué :", e instanceof Error ? e.message : e);
    process.exit(1);
  }
})();
