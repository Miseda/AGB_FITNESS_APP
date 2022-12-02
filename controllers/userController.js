const Account = require('../models/userModel');
const bcrypt = require('bcrypt');

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
            console.log(hashedPassword)
            const account = new Account({
                email: req.body.email,
                password: hashedPassword,
            });
            const savedUser = await account.save();
            res.redirect('/user/login');
        } catch (err){
            // res.json({ message : err });
        }
       
    },

    delete: ("/:UserId", async (req, res) => {
        try{
            const removedAccount = await Account.remove({_id: req.params.goalId});
            res.json(removedAccount);
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
        res.render('services');
    },

    categoryTools: async (req, res) => {
        res.render('servicesTools');
    },


}