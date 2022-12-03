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
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            });
            const savedUser = await account.save();
            res.redirect('/user/login');
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
        res.render('categories');
    },

    categoryTools: async (req, res) => {
        res.render('categoriesTools');
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
            const account = new Account({
                name: req.body.name,
                email: req.body.email,

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



}