
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

    delete:  async (req, res) => {

        const ID = req.query.goalId
        try{
            const removedGoal = await Goal.deleteOne({_id: ID});
            res.redirect('/goals/viewGoals');
        }catch (err){
            res.json({ message : err });
        }
    
    },
    

     //TO UPDATE THE GOALS

     patch: async (req, res) => {


        // console.log(req.query)

       const title = req.query.title;
       const description = req.query.description 
        const ID = req.query.goalId
        
        try{
            const updatedGoal = await Goal.updateOne({_id: ID},
                {$set:
                    {title , 
                    description
             }});
            res.redirect('/goals/viewGoals');
        }catch (err){
            res.json({ message : err });
        }
    
    },   

    add: (req, res) => {
        res.render('addGoals');
    },

    view:async (req, res) => {

        var goals = await Goal.find();
        // goals = goals.map(g => g.toObject())

        res.render('viewGoals',{goals});
    },

    showUpdate: async (req,res) => {

        const ID = req.query.goalId
        const goal = await  Goal.findOne({_id:ID});

        res.render('updateGoals',{goal})

    }

    

    




}
