const mongoose = require("mongoose");

const CatWaySchema = new mongoose.Schema(
  {
    catwayNumber: { type: Number, required: true },
    catwayType: { type: String, required: true },
    catwayState: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Catway", CatWaySchema, "catways");
