const express = require("express");
const router = express.Router();
const c = require("../controllers/userController");
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: CRUD des utilisateurs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Liste tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/User' }
 */
router.get("/", c.getAllUsers);

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Détails d'un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema: { type: string, format: email }
 *     responses:
 *       200: { description: OK, content: { application/json: { schema: { $ref: '#/components/schemas/User' } } } }
 *       404: { description: Introuvable }
 */
router.get("/:email", c.getUserByEmail);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crée un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UserCreateInput' }
 *           example: { email: "admin@port.local", name: "Admin", password: "secret" }
 *     responses:
 *       201: { description: Créé }
 *       409: { description: Conflit (email déjà utilisé) }
 */
router.post("/", c.createUser);

/**
 * @swagger
 * /users/{email}:
 *   put:
 *     summary: Met à jour un utilisateur (nom et/ou mot de passe)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema: { type: string, format: email }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UserUpdateInput' }
 *           example: { name: "Nouvel Admin", password: "nouveau_mdp" }
 *     responses:
 *       200: { description: Mis à jour }
 *       404: { description: Introuvable }
 */
router.put("/:email", c.updateUser);

/**
 * @swagger
 * /users/{email}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema: { type: string, format: email }
 *     responses:
 *       204: { description: Supprimé }
 *       404: { description: Introuvable }
 */
router.delete("/:email", c.deleteUser);

module.exports = router;
