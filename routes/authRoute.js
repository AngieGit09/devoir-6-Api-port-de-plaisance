const express = require("express");
const router = express.Router();
const a = require("../controllers/authController");

router.post("/login", a.login);
router.get("/logout", a.logout);

module.exports = router;
