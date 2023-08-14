const scriptSources = ["'self'", "'unsafe-inline'", "'unsafe-eval'"];
const styleSources = ["'self'", "'unsafe-inline'"];
const connectSources = ["'self'"];
const crossOriginResourcePolicy = require("cross-origin-resource-policy");

const  cspDirectives= {
    defaultSrc: [
      "'self'",
      'http://localhost/*',
      'http://*.google-analytics.com',
      'http://www.googletagmanager.com',
      'https://*.google.com',
      'https://*.google-analytics.com',
      'https://*.googletagmanager.com',
      'https://*.gstatic.com',
      'https://*.googleapis.com',
      'https://authedmine.com',
      'https://az743702.vo.msecnd.net',
      'https://sentry.io',
      'https://unicons.iconscout.com/',
      'https://www.themealdb.com/',
      // 'ws:<http://localhost>',
      // 'ws:<my-webpage-url>',
    ],
    styleSrc: [
      '\'self\'',
      '\'unsafe-inline\'',
      'https://unicons.iconscout.com/',
      'https://*.googleapis.com'
    ],
    scriptSrc: [
      '\'self\'',
      '\'unsafe-inline\'',
      'http://*.googletagmanager.com',
      'https://*.google-analytics.com'
    ],
    scriptSrcAttr: [ '\'self\'', '\'unsafe-inline\''],
    upgradeInsecureRequests: null
  }
;

var app = require('express')();
const helmet = require("helmet");
const cspDefaults = helmet.contentSecurityPolicy.getDefaultDirectives();
console.log("DIRECTIVAS: "+JSON.stringify(cspDefaults));
delete cspDefaults['upgrade-insecure-requests'];

app.use(  helmet.contentSecurityPolicy({
  useDefaults: true,
  crossOriginEmbedderPolicy: false,
  directives: cspDirectives
  // directives: cspDirectives
}));
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

myroles= {
  pagos: 'vkarpov15',
  ingresos: '@code_barbarian',
  nominas : "rw"
}
var rolesusr =['pagos','nominas','ingresos','pagos'];
const newUser = {
  firstName: 'Ramiro',
  lastName: 'Pérez',
  password: '123456',
  userName: 'super',
  gender: 'Male',
  email: 'xsuper@mydomain.com',
  roles: myroles
}

// var user = new User(newUser)
// user.save().then( () => {
//   console.log('Everything went well');
// }).catch( (e) => {
//   console.log('There was an error', e.message);
// });

var AuthController = require('./controllers/AuthController');

// import Router file
var pageRouter = require('./routers/route');

var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var i18n = require("i18n-express");
app.use(bodyParser.json());
app.use(crossOriginResourcePolicy({ policy: "same-origin" }));
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



app.use(session({ resave: false, saveUninitialized: true, secret: 'nodedemo-sessionxyz99' }));
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
