var passport = require('passport');
// var config = require('./config.js');
 
// User model
var User = require('../models/User');
 
// Strategies
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;
 
// Used to create, sign, and verify tokens
var jwt = require('jsonwebtoken');
 
// Local strategy with passport mongoose plugin User.authenticate() function
passport.use(new LocalStrategy(User.authenticate()));
 
// Required for our support for sessions in passport.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 
exports.getToken = function(user) {
   // This helps us to create the JSON Web Token
//    return jwt.sign(user, config.secretKey,{expiresIn: 3600});
console.log('user;:'+user)
return jwt.sign(user, 'fea33QDdsaee-ssss-wwd-',{expiresIn: 3600});
};
 
// Options to specify for my JWT based strategy.
var opts = {};
 
// Specifies how the jsonwebtoken should be extracted from the incoming request message
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
 
//Supply the secret key to be using within strategy for the sign-in.
// opts.secretOrKey = config.secretKey;
opts.secretOrKey =  'fea33QDdsaee-ssss-wwd-';
 
// JWT Strategy
exports.jwtPassport = passport.use(new JwtStrategy(opts,
   // The done is the callback provided by passport
   (jwt_payload, done) => {
     
    console.log('jwt_payload._id:'+jwt_payload._id)
       // Search the user with jwt.payload ID field
       User.findOne({_id: jwt_payload._id}, (err, user) => {
           // Have error
           if (err) {
               return done(err, false);
           }
           // User exist
           else if (user) {
               return done(null, user);
           }
           // User doesn't exist
           else {
               return done(null, false);
           }
       });
   }));
 
// Verify an incoming user with jwt strategy we just configured above   
exports.verifyUser = passport.authenticate('jwt', {session: false});