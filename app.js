require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const reservationRoutes = require("./routes/reservationRoute");
const app = express();

app.use(express.json());
app.get("/_health", (_req, res) =>
  res.json({ state: mongoose.connection.readyState })
);
app.use("/users", require("./routes/userRoute"));
app.use("/", require("./routes/authRoute"));
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB OK");

    app.use("/catways", require("./routes/catwayRoute"));
    app.use("/reservations", reservationRoutes);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`API prête sur http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Erreur MongoDB :", err);
    process.exit(1);
  }
})();
