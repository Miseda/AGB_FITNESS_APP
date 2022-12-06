
const Goal = require('../models/goalModel');
const Category = require('../models/category');

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
        const category = await Category.findOne({_id:req.body.category});

   
        
        const goal = new Goal({
            title: req.body.title,
            description: req.body.description,
            category
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
       const status = req.query.status
        const ID = req.query.goalId
        
        try{
            const updatedGoal = await Goal.updateOne({_id: ID},
                {$set:
                    {title , 
                    description,status
             }});
            res.redirect('/goals/viewGoals');
        }catch (err){
            res.json({ message : err });
        }
    
    },    
 
    add: async (req, res) => {
        // var category = await Category.find(req.query.categoryId)


        // res.render('addGoals',{category});
        res.render('addGoals', {id: req.query.id});
    },

    view: async (req, res) => {

        var goals = await Goal.find();
        const category = await Category.findOne({_id:req.body.category});
        

        res.render('viewGoals',{goals});
    },
  
    showUpdate: async (req,res) => {

        const ID = req.query.goalId
        const goal = await  Goal.findOne({_id:ID});

        res.render('updateGoals',{goal})

    }

    

    




}
