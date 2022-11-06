
const Goal = require('../models/goalModel');
module.exports = {
    
    //TO SHOW THE GOALS

    get: async (req, res) => {

        try {
          
            const goals = await Goal.find();
            res.json(goals);
        } catch (err){
            res.json({ message : err });
        }
    },


    //TO SUBMIT THE GOALS

    post: async (req,res) => {
        const goal = new Goal({
            title: req.body.title,
            description: req.body.description,
        });

        try {
            const savedGoal = await goal.save();
            // res.json (savedGoal);
            res.redirect('/goals/viewGoals');
        } catch (err){
            res.json({ message : err });
        }

    },

    //TO DELETE THE GOALS

    delete: ("/:goalId", async (req, res) => {
        try{
            const Goal = require('../models/goalModel');
            const removedGoal = await Goal.deleteOne({_id: req.params.goalId});
            res.json(removedGoal);
        }catch (err){
            res.json({ message : err });
        }
    
    }),
    

     //TO UPDATE THE GOALS

     patch: ("/:goalId", async (req, res) => {
        try{
            const Goal = require('../models/goalModel');
            const updatedGoal = await Goal.updateOne({_id: req.params.goalId},
                {$set:{title: req.body.title , description: req.body.description}});
            res.json(updatedGoal);
        }catch (err){
            res.json({ message : err });
        }
    
    }),

    add: (req, res) => {
        res.render('addGoals');
    },

    view:async (req, res) => {

        const goals = await Goal.find();
        res.render('viewGoals',{goals});
    }

    

    




}
