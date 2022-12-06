const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");
const passport = require('passport')

function checkNotAuthenticated(req,res,next){
    if (req.isAuthenticated()) {
       return res.redirect('/user/categories')
    }
    next()
}

function checkAuthenticated(req,res,next){
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

router.get("/", controller.get);
router.delete("/UserId", controller.delete);
router.patch("/UserId", controller.patch);


//To view the signUp page
router.get("/signUp",checkNotAuthenticated, controller.signUp);
  
//To add user to the database
router.post("/signedUp",checkNotAuthenticated, controller.post); 

//To view the aboutUs page
router.get("/aboutUs",controller.aboutUs);

//To view the categories page
router.get("/categories",checkAuthenticated, controller.categories);

//To view the manager categories page
router.get("/categoriesTools",checkAuthenticated, controller.categoryTools);

//To view the manager page
router.get("/manager",checkAuthenticated, controller.manager);

//To view the add staff page
router.get("/addStaff",checkAuthenticated, controller.managerAdd);

//To add staff to the database
router.post("/signedStaff",checkAuthenticated, controller.postManager);

//To view delete staff page 
router.get("/deleteStaff", checkAuthenticated, controller.managerDelete);

//To delete a user to the database
router.post("/deletedStaff",checkAuthenticated, controller.delete);

//To view add category page 
router.get("/addCategory", checkAuthenticated, controller.addCategory);

//To add category page 
router.post("/addedCategory",checkAuthenticated, controller.postCategory);

//To show notification page 
router.get("/notStaff", controller.showNotification);

//To show notification page about not checking any checkbox
router.get("/noCheckbox", controller.showNotification2);

module.exports = router;