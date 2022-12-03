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
router.post("/signedUp", controller.post); 

//To view the aboutUs page
router.get("/aboutUs",controller.aboutUs);

//To view the categories page
router.get("/categories",controller.categories);

//To view the manager categories page
router.get("/categoriesTools",controller.categoryTools);

//To view the manager page
router.get("/manager",controller.manager);

//To view the add staff page
router.get("/addStaff",controller.managerAdd);

//To add staff to the database
router.post("/signedStaff", controller.postManager);

//To view delete staff page 
router.get("/deleteStaff", controller.managerDelete);

//To delete a user to the database
router.post("/deletedStaff", controller.delete);

module.exports = router;