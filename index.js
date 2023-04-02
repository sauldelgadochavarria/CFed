var app = require('express')();

var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var http = require('http').Server(app);
var validator = require('express-validator');

//nuevo
var passport = require('passport');
var config = require('./config');
// nuevo conecta a bd
var User = require('./models/User')
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUrl)
var db = mongoose.connection
db.on('error', function(err){
  console.log('connection error', err)
})

db.once('open', function(){
  console.log('Connection to DB successful')
})

const newUser = {
  firstName: 'Pedro',
  lastName: 'Pérez',
  password: 'P@ssw0rd',
  userName: 'pedrito',
  gender: 'Male',
  email: 'prueba@prueba.com'
}
var user = new User(newUser)
user.save().then( () => {
  console.log('Everything went well');
}).catch( (e) => {
  console.log('There was an error', e.message);
});

var AuthController = require('./controllers/AuthController');

// import Router file
var pageRouter = require('./routers/route');

var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var i18n = require("i18n-express");
app.use(bodyParser.json());
var urlencodeParser = bodyParser.urlencoded({ extended: true });

app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 1200000
  }
}));

// nuevo 
app.use(passport.initialize());

// fin nuevo
app.use(session({ resave: false, saveUninitialized: true, secret: 'nodedemo' }));
app.use(flash());
app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'), // <--- use here. Specify translations files path.
  siteLangs: ["es", "en", "de", "ru", "it", "fr"],
  textsVarName: 'translation'
}));

app.use('/public', express.static('public'));
app.use(express.json());
app.get('/layouts/', function (req, res) {
  res.render('view');
});

// apply controller
AuthController(app);

//For set layouts of html view
var expressLayouts = require('express-ejs-layouts');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Define All Route 
pageRouter(app);

app.get('/', function (req, res) {
  res.redirect('/');
});

http.listen(8000, function () {
  console.log('listening on *:8000');
});
