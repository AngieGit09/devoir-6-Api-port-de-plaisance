const bcrypt = require("bcryptjs");
const User = require("../models/user");

// POST /login  (stateless: renvoie 200 si OK, pas de session/JWT)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password)
      return res.status(400).json({ message: "email et password requis" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.status(401).json({ message: "Identifiants invalides" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Identifiants invalides" });

    res.json({
      message: "Connecté",
      user: { email: user.email, name: user.name },
    });
  } catch (e) {
    res.status(500).json({ message: "Erreur serveur", error: String(e) });
  }
};

// GET /logout  (stateless: simple acknowledgement)
exports.logout = async (_req, res) => {
  res.json({ message: "Déconnecté" });
};
