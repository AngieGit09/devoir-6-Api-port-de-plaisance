const mongoose = require("mongoose");
const Reservation = require("../models/reservation");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
const stripSystemFields = (obj) => {
  if (!obj) return obj;
  delete obj._id;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};

// GET / Reservations
exports.getAllReservations = async (_req, res) => {
  try {
    const docs = await Reservation.find().lean();
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: String(error) });
  }
};

//GEt / Reservation /:id
exports.getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "ID invalide" });

    const doc = await Reservation.findById(id).lean();
    if (!doc)
      return res.status(404).json({ message: "Reservation introuvable" });

    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: String(error) });
  }
};

//POST / Reservation
exports.createReservation = async (req, res) => {
  try {
    const { catwayNumber, clientName, boatName, startDate, endDate } =
      req.body || {};
    if (
      catwayNumber == null ||
      !clientName ||
      !boatName ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        message:
          "catwayNumber, clientName, boatName, startDate, endDate requis",
      });
    }
    const doc = await Reservation.create({
      catwayNumber,
      clientName,
      boatName,
      startDate,
      endDate,
    });
    res.status(201).json({ message: "Reservation créée", reservation: doc });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur de validation", error: String(error) });
  }
};

//PUT / Reservation /:id
exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "ID invalide" });

    const { catwayNumber, clientName, boatName, startDate, endDate } =
      req.body || {};
    if (
      catwayNumber == null ||
      !clientName ||
      !boatName ||
      !startDate ||
      !endDate
    ) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont requis pour PUT" });
    }

    const payload = stripSystemFields({
      catwayNumber,
      clientName,
      boatName,
      startDate,
      endDate,
    });

    const updated = await Reservation.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
      overwrite: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Reservation introuvable" });

    res
      .status(200)
      .json({ message: "Reservation mise à jour", reservation: updated });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour", error: String(error) });
  }
};

//PATCH / Reservation/:id
exports.patchReservation = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "ID invalide" });

    const payload = stripSystemFields({ ...req.body });
    if (!payload || Object.keys(payload).length === 0) {
      return res.status(400).json({ message: "Aucune donnée à modifier" });
    }

    const patched = await Reservation.findByIdAndUpdate(
      id,
      { $set: payload },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!patched)
      return res.status(404).json({ message: "Reservation introuvable" });

    res
      .status(200)
      .json({ message: "Reservation modifiée", reservation: patched });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors du patch", error: String(error) });
  }
};

//DELETE / Reservation/:id
exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "ID invalide" });

    const deleted = await Reservation.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Reservation introuvable" });

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression", error: String(error) });
  }
};
