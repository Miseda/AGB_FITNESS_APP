const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");

router.get("/", controller.get);
router.post("/", controller.post);
router.delete("/UserId", controller.delete);
router.patch("/UserId", controller.patch);

module.exports = router;