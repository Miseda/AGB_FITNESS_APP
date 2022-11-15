const express = require ('express');
const mongoose = require ('mongoose');
const app = express();
const bodyParser = require('body-parser');
const path = require("path")
const mustache = require('mustache-express');

// app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json()); // To convert into JSON to allow the use of POST
const static_path = express.static(path.join(__dirname,"./public"))

app.use(static_path)
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('view engine', 'mustache');
app.set("views", __dirname + "/views");





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
app.use('/goals', goalRoute);
app.use('/user', userRoute);  



app.get('/',(req, res) => {
    res.send('This is the homepage.')
})



// router.get("/images/logo",function(req,res){

//     res.send()
// })



app.listen(3000, () => console.log('Connection succesful, server started on port 3000'));
