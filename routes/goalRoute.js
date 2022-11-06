const express = require('express');
const router = express.Router(); 
const controller = require("../controllers/goalController");
  

router.get("/", controller.get);
router.get("/item",controller.delete);
router.get("/update",controller.patch);   
     
// //ADD GOALS PAGE
router.post("/addGoals",controller.post); //Post to the view goals page.
router.get("/addGoals",controller.add); //Show the add goals page.

//VIEW GOALS PAGE  
router.get("/viewGoals",controller.view); //Show the add goals page.

router.get("/updateGoal",controller.showUpdate);  





module.exports = router;