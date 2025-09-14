const express = require("express");
const router = express.Router();
const c = require("../controllers/userController");

router.get("/", c.getAllUsers);
router.get("/:email", c.getUserByEmail);
router.post("/", c.createUser);
router.put("/:email", c.updateUser);
router.delete("/:email", c.deleteUser);

module.exports = router;
