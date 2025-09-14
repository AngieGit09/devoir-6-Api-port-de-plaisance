const express = require("express");
const router = express.Router();
const c = require("../controllers/catwayController");

/**
 * @swagger
 * tags:
 *   name: Catways
 *   description: CRUD des catways
 */

/**
 * @swagger
 * /catways:
 *   get:
 *     summary: Liste tous les catways
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: Tableau de catways
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Catway' }
 */
router.get("/", c.getAllCatways);

/**
 * @swagger
 * /catways/{id}:
 *   get:
 *     summary: Détails d'un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Introuvable }
 */
router.get("/:id", c.getCatwayById);

/**
 * @swagger
 * /catways:
 *   post:
 *     summary: Crée un catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CatwayInput' }
 *           example: { catwayNumber: 21, catwayType: "short", catwayState: "bon état" }
 *     responses:
 *       201: { description: Créé }
 */
router.post("/", c.createCatway);

/**
 * @swagger
 * /catways/{id}:
 *   put:
 *     summary: Remplace un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CatwayInput' }
 *     responses:
 *       200: { description: Mis à jour }
 */
router.put("/:id", c.updateCatway);

/**
 * @swagger
 * /catways/{id}:
 *   patch:
 *     summary: Modifie partiellement un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CatwayInput' }
 *     responses:
 *       200: { description: Modifié }
 */
router.patch("/:id", c.patchCatway);

/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Supprime un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Supprimé }
 */
router.delete("/:id", c.deleteCatway);

module.exports = router;
