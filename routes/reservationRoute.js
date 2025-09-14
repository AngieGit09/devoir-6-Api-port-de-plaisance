const express = require("express");
const router = express.Router();

const c = require("../controllers/reservationController");

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: CRUD des réservations
 */

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Liste toutes les réservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Reservation' }
 */
router.get("/", c.getAllReservations);

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Détails d'une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Introuvable }
 */
router.get("/:id", c.getReservationById);

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Crée une réservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ReservationInput' }
 *           example:
 *             { catwayNumber: 13, clientName: "Jacky Snow", boatName: "Léandra",
 *               startDate: "2024-09-18T06:00:00Z", endDate: "2024-12-23T06:00:00Z" }
 *     responses:
 *       201: { description: Créée }
 */
router.post("/", c.createReservation);

/**
 * @swagger
 * /reservations/{id}:
 *   put:
 *     summary: Remplace une réservation (PUT)
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ReservationInput' }
 *     responses:
 *       200: { description: Mise à jour }
 *       404: { description: Introuvable }
 */
router.put("/:id", c.updateReservation);

/**
 * @swagger
 * /reservations/{id}:
 *   patch:
 *     summary: Modifie partiellement une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ReservationInput' }
 *     responses:
 *       200: { description: Modifiée }
 *       404: { description: Introuvable }
 */
router.patch("/:id", c.patchReservation);

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Supprime une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Supprimée }
 *       404: { description: Introuvable }
 */
router.delete("/:id", c.deleteReservation);

module.exports = router;
