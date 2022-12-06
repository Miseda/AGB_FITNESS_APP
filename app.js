if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
  
const express = require ('express');
const mongoose = require ('mongoose');
const app = express();
const bodyParser = require('body-parser')
const path = require("path")
const mustache = require('mustache-express')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const User = require("./models/userModel")
const Account = require('./models/userModel');
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')


const initializePassport = require('./passport-config')
initializePassport (
    passport, 
    email => User.find(user => user.email === email),
    id => User.find(user => user.id === id)
    )

app.use(methodOverride("_method"))
app.use(flash())

app.set('trust proxy', 1);
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: false,
    maxAge: 1000 * 60 * 15,
    cookie:{
      secure: false
           }
}))



app.use(cookieParser());
app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json()); // To convert into JSON to allow the use of POST
const static_path = express.static(path.join(__dirname,"./public"))

app.use(static_path)
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('view engine', 'mustache');
app.set("views", __dirname + "/views");


app.get('/login',checkNotAuthenticated, (req, res) => {
    res.render('login');
})



app.post(
    '/login',
    passport.authenticate('local', {
      failureRedirect: '/login'
    }), (req, res) => {
      if (req.user.isManager === true) {
        res.redirect('/user/categoriesTools');
      }
      if (req.user.isStaff === true) {
        res.redirect('/user/categories');
      }
    });





function checkAuthenticated(req,res,next){
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req,res,next){
    if (req.isAuthenticated()) {
        return res.redirect('/user/categories')
    }
    next()
}



app.delete('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.status(400).send('Unable to log out')
        } else {
            res.redirect('/login');
        }
      });
    } else {
      res.end()
    }
  })


//CONNECTION TO MONGO DB
const uri = 'mongodb+srv://agb_fitness:1234@agb.okldzql.mongodb.net/?retryWrites=true&w=majority'

async function connect() {
    try{
        await mongoose.connect(uri)
        console.log ('Successfully connected to MongoDB')
    } catch(error){
        console.error(error);
    }
}

connect();

// ROUTES 
const goalRoute = require('./routes/goalRoute');
const userRoute = require('./routes/userRoute');
const router = require('./routes/goalRoute');
app.use('/goals', goalRoute);
app.use('/user', userRoute);  




app.get('/',(req, res) => {
    res.send('This is the homepage.')
})


app.listen(3000, () => console.log('Connection succesful, server started on port 3000'));

