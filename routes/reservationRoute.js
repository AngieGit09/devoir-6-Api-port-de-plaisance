const express = require("express");
const router = express.Router();

const c = require("../controllers/reservationController");

router.get("/", c.getAllReservations);
router.get("/:id", c.getReservationById);
router.post("/", c.createReservation);
router.put("/:id", c.updateReservation);
router.patch("/:id", c.patchReservation);
router.delete("/:id", c.deleteReservation);

module.exports = router;
