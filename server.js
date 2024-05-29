const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const flash = require('connect-flash');
const cors = require('cors');
const { config: c } = require('dotenv');


const app = express()
    , dir = './build'
    , indexDir = '/build/index.html' 


const port = process.env.PORT || 3004; 

let config = c({path: './env/dev.env'});
console.log(config);

mongoose.connect("mongodb+srv://zafarTZ:78X2CPohNXu0ydsz@cluster0.xwhkwcr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {useNewUrlParser: true, useUnifiedTopology: true})
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log('Mongo Connected : ' + process.env.MONGO_DATABASE)
});


app.use(cors());

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
  secret: 'tutorialsecret',
  cookie: {
    secure: false
  },
  saveUninitialized: true,
  resave: false,   
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routers/ping-auth')(passport);
require('./routers/routes')(app, passport);


app.get('/api/v1', (req, res) => {
  res.send('ping pong')
})

app.use(express.static(path.join(__dirname, dir)));

app.use((req, res) => {
    res.sendFile(path.join(__dirname + indexDir));
});

app.listen(port, () => {
  console.log("server running on port " + port + "...");
});
