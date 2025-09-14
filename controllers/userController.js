const bcrypt = require("bcryptjs");
const User = require("../models/user");

// GET /users
exports.getAllUsers = async (_req, res) => {
  try {
    const users = await User.find({}, "-passwordHash").lean();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: "Erreur serveur", error: String(e) });
  }
};

// GET /users/:email
exports.getUserByEmail = async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email).toLowerCase();
    const user = await User.findOne({ email }).select("-passwordHash").lean();
    if (!user)
      return res.status(404).json({ message: "Utilisateur introuvable" });
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "Erreur serveur", error: String(e) });
  }
};

// POST /users
exports.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body || {};
    if (!email || !name || !password) {
      return res.status(400).json({ message: "email, name, password requis" });
    }
    const existing = await User.findOne({ email: email.toLowerCase() }).lean();
    if (existing)
      return res.status(409).json({ message: "Email déjà utilisé" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: email.toLowerCase(),
      name,
      passwordHash,
    });

    const { passwordHash: _, ...safe } = user.toObject();
    res.status(201).json({ message: "Utilisateur créé", user: safe });
  } catch (e) {
    res.status(400).json({ message: "Erreur de création", error: String(e) });
  }
};

// PUT /users/:email  
exports.updateUser = async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email).toLowerCase();
    const { name, password } = req.body || {};
    if (!name && !password) {
      return res
        .status(400)
        .json({ message: "Renseigner name et/ou password" });
    }
    const update = {};
    if (name) update.name = name;
    if (password) update.passwordHash = await bcrypt.hash(password, 10);

    const user = await User.findOneAndUpdate({ email }, update, {
      new: true,
      runValidators: true,
    }).select("-passwordHash");
    if (!user)
      return res.status(404).json({ message: "Utilisateur introuvable" });
    res.json({ message: "Utilisateur mis à jour", user });
  } catch (e) {
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour", error: String(e) });
  }
};

// DELETE /users/:email
exports.deleteUser = async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email).toLowerCase();
    const deleted = await User.findOneAndDelete({ email });
    if (!deleted)
      return res.status(404).json({ message: "Utilisateur introuvable" });
    res.status(204).send();
  } catch (e) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression", error: String(e) });
  }
};
