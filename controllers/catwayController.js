const mongoose = require("mongoose");
const Catway = require("../models/catway");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
const stripSystemFields = (obj) => {
  if (!obj) return obj;
  delete obj._id;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};

exports.getAllCatways = async (_req, res) => {
  try {
    const docs = await Catway.find().lean();
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: String(error) });
  }
};

exports.getCatwayById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "ID invalide" });

    const doc = await Catway.findById(id).lean();
    if (!doc) return res.status(404).json({ message: "CatWay introuvable" });

    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: String(error) });
  }
};

exports.createCatway = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body || {};
    if (catwayNumber == null || !catwayType || !catwayState) {
      return res
        .status(400)
        .json({ message: "catwayNumber, catwayType, catwayState requis" });
    }
    const doc = await Catway.create({ catwayNumber, catwayType, catwayState });
    res.status(201).json({ message: "CatWay créé", catway: doc });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur de validation", error: String(error) });
  }
};

exports.updateCatway = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "ID invalide" });

    const { catwayNumber, catwayType, catwayState } = req.body || {};
    if (catwayNumber == null || !catwayType || !catwayState) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont requis pour PUT" });
    }

    const payload = stripSystemFields({
      catwayNumber,
      catwayType,
      catwayState,
    });

    const updated = await Catway.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
      overwrite: true,
    });
    if (!updated)
      return res.status(404).json({ message: "CatWay introuvable" });

    res.status(200).json({ message: "CatWay mis à jour", catway: updated });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour", error: String(error) });
  }
};

exports.patchCatway = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "ID invalide" });

    const payload = stripSystemFields({ ...req.body });
    if (!payload || Object.keys(payload).length === 0) {
      return res.status(400).json({ message: "Aucune donnée à modifier" });
    }

    const patched = await Catway.findByIdAndUpdate(
      id,
      { $set: payload },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!patched)
      return res.status(404).json({ message: "CatWay introuvable" });

    res.status(200).json({ message: "CatWay modifié", catway: patched });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors du patch", error: String(error) });
  }
};

exports.deleteCatway = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "ID invalide" });

    const deleted = await Catway.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "CatWay introuvable" });

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression", error: String(error) });
  }
};
