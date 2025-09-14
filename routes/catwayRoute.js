const express = require("express");
const router = express.Router();
const c = require("../controllers/catwayController");

router.get("/", c.getAllCatways);
router.get("/:id", c.getCatwayById);

router.post("/", c.createCatway);
router.put("/:id", c.updateCatway);
router.patch("/:id", c.patchCatway);
router.delete("/:id", c.deleteCatway);

module.exports = router;
