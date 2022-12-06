const Account = require('../models/userModel');
const bcrypt = require('bcrypt');
const Category = require('../models/category')


module.exports = {
    get: async (req, res) => {

        try {
            const accounts = await Account.find();
            res.json(accounts);
        } catch (err){
            res.json({ message : err });
        }
         
    }, 

    post: async (req,res)  => {
     

        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const staff = req.body.staff 
            const manager = req.body.manager

            if(!staff && !manager) {
                res.redirect("/user/noCheckbox")

            }

            if(staff) { 
                const foundUser = Account.findOne({email:req.body.email}) // find user and see if they hav ealready been added by manager
                if(!foundUser) {
                    res.redirect("/user/notStaff") //If not, show them a notification
                } 
            }

            const account = new Account({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                isStaff: staff ? true : false, 
                isManager : manager? true : false
            });
            const savedUser = await account.save();
            res.redirect('/login');
        } catch (err){
            // res.json({ message : err });
        }
       
    },

    delete: ( async (req, res) => {

        const name = req.body.name

        try{
            const removedAccount = await Account.deleteOne({name: name});
            res.redirect('/user/manager');
        }catch (err){
            res.json({ message : err });
        }
    
    }),

    patch: ("/:UserId", async (req, res) => {
        try{
            const updatedAccount = await Account.updateOne({_id: req.params.goalId},
                {$set:{ password: req.body.password}});
            res.json(updatedAccount);
        }catch (err){
            res.json({ message : err });
        }
    
    }),

    login: async (req, res) => {
        res.render('login');
    },

    signUp: async (req, res) => {
        res.render('signUp');
    },


    aboutUs: async (req, res) => {
        res.render('aboutUs');
    },

    categories: async (req, res) => {
        var categories = await Category.find()
        res.render('categories', {categories});
    },

    categoryTools: async (req, res) => {
        var categories = await Category.find()
        res.render('categoriesTools',{categories});
    },

    manager: async (req, res) => {

        var user = await Account.find();
        res.render('manager', {user});
    },

    managerAdd: async (req, res) => {

        var user = await Account.find();
        res.render('addStaff');
    },

    postManager: async (req,res)  => {

        
        try {
            const staff = req.body.staff 
            const account = new Account({
                name: req.body.name,
                email: req.body.email, 
                isStaff: staff ? true : false, 

            });
            const savedUser = await account.save();
            res.redirect('/user/manager');
        } catch (err){
            // res.json({ message : err });
        }
       
    },

    managerDelete: async (req, res) => {

        var user = await Account.find();
        res.render('deleteStaff');
    },

    addCategory: async (req, res) => {

        res.render('addCategory');
    },
    
    postCategory: async (req,res) => {
        const category = new Category({
            title: req.body.title,
            description: req.body.description,
        });

        try {
            const savedCategory = await category.save();
            res.redirect('/user/manager');
        } catch (err){
            res.json({ message : err });
        }

    },

    showNotification:  async (req, res) => {

        res.render('notification');
    },
    
    showNotification2:  async (req, res) => {

        res.render('notification2');
    },



}