
const express = require("express");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");
const port = 3000;
const fs = require("fs");

//Express specific
app.use('/static', express.static('static'));
app.use(express.urlencoded({extended:true}));  // without adding extended:true, terminal throws error.

//Pug sppecific
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "views"));


// USING MONGOOSE

//IMPORTING MONGOOSE
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kang', {useNewUrlParser: true});

//SETTING UP CONNECTION
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log('we are connected!')
});

//FIRST WE HAVE TO SET A SCHEMA
var contactFormSchema = new mongoose.Schema({
    name: String,
    number: String,
    email: String,
    address: String,
    message: String
});


//CONFIRM THE SCHEMA AND NO FURTHER CHANGES CAN BE MADE
    var inputUser = mongoose.model('model', contactFormSchema);
//Endpoint
app.get('/', (req, res)=> {
    const title = "Kang GYM";
    // const content = "";
    const parameters = {"title": title}
    res.status(200).render('index.pug', parameters)
  })



app.post('/', (req, res) => {
    var data = new inputUser(req.body);
    data.save().then(() => {
        res.send("The details has been submitted successfully"
        )}).catch(() => 
        { res.status(404).send("Sorry! An error occured. Please try again")
    });
});

//Starting the server
  
  app.listen(port, ()=> {
      console.log("The port has started");
  })

    