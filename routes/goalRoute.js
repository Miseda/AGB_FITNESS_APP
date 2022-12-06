const express = require('express');
const router = express.Router(); 
const controller = require("../controllers/goalController");
const passport = require('passport')

function checkAuthenticated(req,res,next){
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}
  

router.get("/",checkAuthenticated,controller.get);  

//To delete the goal
router.get("/item",checkAuthenticated,controller.delete);

//To update the goal
router.get("/update",checkAuthenticated, controller.patch);   
        
//ADD GOALS PAGE

//To Post to the view goals page.
router.post("/addGoals",checkAuthenticated, controller.post); 

//To Post to the view goals page.
router.get("/addGoals",checkAuthenticated, controller.add); 

//VIEW GOALS PAGE  

//To show the view goals page.
router.get("/viewGoals",checkAuthenticated, controller.view); 

//To show the update goals page.
router.get("/updateGoal",checkAuthenticated, controller.showUpdate);  



module.exports = router;