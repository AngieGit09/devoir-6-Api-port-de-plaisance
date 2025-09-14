const express = require("express");
const router = express.Router();
const a = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Connexion / Déconnexion
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connexion
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/LoginInput' }
 *           example: { email: "admin@port.local", password: "secret" }
 *     responses:
 *       200: { description: OK }
 *       401: { description: Identifiants invalides }
 */
router.post("/login", a.login);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Déconnexion
 *     tags: [Auth]
 *     responses:
 *       200: { description: OK }
 */
router.get("/logout", a.logout);

module.exports = router;
