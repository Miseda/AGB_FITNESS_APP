const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");

router.get("/", controller.get);
router.delete("/UserId", controller.delete);
router.patch("/UserId", controller.patch);

//To view the login page
router.get("/login",controller.login);

//To view the signUp page
router.get("/signUp",controller.signUp);

//To add user to the database
router.post("/signUp", controller.post); 


module.exports = router;