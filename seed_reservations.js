require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Reservation = require("./models/reservation");

function pick(obj, keys) {
  for (const k of keys) if (obj[k] != null) return obj[k];
  return undefined;
}
function normalize(src) {
  return {
    catwayNumber: pick(src, [
      "catwayNumber",
      "numero",
      "catway",
      "catways",
      "catway_num",
      "catwayId",
    ]),
    clientName: pick(src, ["clientName", "client", "client_name", "nomClient"]),
    boatName: pick(src, ["boatName", "bateau", "boat", "nomBateau"]),
    startDate: pick(src, ["startDate", "dateDebut", "debut", "start"]),
    endDate: pick(src, ["endDate", "dateFin", "fin", "end"]),
  };
}

(async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI manquant dans .env");

    await mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 });
    console.log("Mongo connecté");

    const file = path.resolve(__dirname, "data", "reservation.json");

    let rawData;
    if (fs.existsSync(file)) {
      console.log(
        "📄 Lecture du fichier :",
        path.relative(process.cwd(), file)
      );
      rawData = fs.readFileSync(file, "utf-8");
    } else {
      console.log(
        "ℹ️ Fichier data/reservation.json introuvable — insertion de données par défaut."
      );
      rawData = JSON.stringify(
        [
          {
            catwayNumber: 13,
            clientName: "Jacky Snow",
            boatName: "Léandra",
            startDate: "2024-09-18T06:00:00Z",
            endDate: "2024-12-23T06:00:00Z",
          },
          {
            catwayNumber: 21,
            clientName: "Alice Blue",
            boatName: "Sirène",
            startDate: "2024-10-01T06:00:00Z",
            endDate: "2024-12-31T06:00:00Z",
          },
        ],
        null,
        2
      );
    }

    let data = JSON.parse(rawData);
    if (!Array.isArray(data)) data = [data];

    console.log("🔎 Exemple brut:", data[0]);
    const normalized = data.map(normalize);
    console.log("🔎 Exemple normalisé:", normalized[0]);

    const valid = normalized.filter(
      (d) =>
        d.catwayNumber != null &&
        d.clientName &&
        d.boatName &&
        d.startDate &&
        d.endDate
    );
    console.log(`Valides: ${valid.length} / ${normalized.length}`);
    if (valid.length === 0) {
      throw new Error(
        "Aucune réservation valide à insérer (vérifie les noms de champs dans le JSON)."
      );
    }

    await Reservation.deleteMany({});
    const inserted = await Reservation.insertMany(valid);
    console.log(`🌱 OK : ${inserted.length} réservations insérées`);
    if (inserted.length) {
      const s = inserted[0];
      console.log("👀 Exemple inséré:", {
        _id: s._id,
        catwayNumber: s.catwayNumber,
        clientName: s.clientName,
        boatName: s.boatName,
      });
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (e) {
    console.error("Seed échoué :", e?.message || e);
    try {
      await mongoose.disconnect();
    } catch {}
    process.exit(1);
  }
})();
